import argparse
import json
import sys
from base64 import b64encode

import requests
from nacl import encoding
from nacl import public


def __get_repo_public_key(repo_owner: str, repo_name: str, token: str) -> (str, str):
    """
    Gets a repository public key, which is needed to encrypt secrets.

    More info at https://docs.github.com/en/rest/actions/secrets?apiVersion=2022-11-28#get-a-repository-public-key

    :param repo_owner:  The account owner of the repository, e.g. "QubitPi". The name is not case-sensitive.
    :param repo_name:  The name of the repository without the .git extension, e.g. "hashicorp-aws". The name is not
    case-sensitive.
    :param token:  A fine-grained access token with repository permissions that at least has "Read-only" on "Secrets"
    section

    :return: object with two keys: "key_id" and "key" (i.e. the public key)
    """
    headers = {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer ' + token,
        'X-GitHub-Api-Version': '2022-11-28',
    }

    response_body = requests.get(
        "https://api.github.com/repos/{repo_owner}/{repo_name}/actions/secrets/public-key".format(
            repo_owner=repo_owner,
            repo_name=repo_name
        ),
        headers=headers
    ).json()

    return (response_body['key_id'], response_body['key'])


def __create_or_update_repo_secret(
        repo_owner: str,
        repo_name: str,
        token: str,
        secret_name: str,
        encrypted_value: str,
        key_id: str
) -> None:
    """
    Creates or update a repository secret

    More info at https://docs.github.com/en/rest/actions/secrets?apiVersion=2022-11-28#create-or-update-a-repository-secret

    :param repo_owner:  The account owner of the repository, e.g. "QubitPi". The name is not case-sensitive.
    :param repo_name:  The name of the repository without the .git extension, e.g. "hashicorp-aws". The name is not
    case-sensitive.
    :param token:  A fine-grained access token with repository permissions that at least has "Read and write" on
    "Secrets" section
    :param secret_name:  The name of GitHub Secret as appeared on the Actions secrets list
    :param encrypted_value: Value for the secret, encrypted with :py:meth:`encrypt`
    :param key_id:  ID of the public key used to encrypt the secret.
    """
    headers = {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer ' + token,
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    data = {
        "encrypted_value": encrypted_value,
        "key_id": key_id
    }

    response = requests.put(
        "https://api.github.com/repos/{repo_owner}/{repo_name}/actions/secrets/{secret_name}".format(
            repo_owner=repo_owner,
            repo_name=repo_name,
            secret_name=secret_name
        ),
        headers=headers,
        data=json.dumps(data)
    )

    if response.status_code == 201:
        print("Successfully created '{secret_name}'".format(secret_name=secret_name))
    elif response.status_code == 204:
        print("Successfully updated '{secret_name}'".format(secret_name=secret_name))
    else:
        print(
            "Error on creating/updating '{secret_name}': {error}".format(secret_name=secret_name, error=response.json())
        )


def __encrypt(public_key: str, secret_value: str) -> str:
    """
    More infro at https://docs.github.com/en/rest/guides/encrypting-secrets-for-the-rest-api?apiVersion=2022-11-28#example-encrypting-a-secret-using-python
    """
    public_key = public.PublicKey(public_key.encode("utf-8"), encoding.Base64Encoder())
    sealed_box = public.SealedBox(public_key)
    encrypted = sealed_box.encrypt(secret_value.encode("utf-8"))
    return b64encode(encrypted).decode("utf-8")


def __load_secrete_from_file(file_path: str) -> str:
    with open(file_path, 'r') as file:
        return file.read()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Create or update an GitHub repo secret')
    parser.add_argument(
        '-o',
        '--owner',
        help='The account owner of the repository. The name is not case sensitive.',
        required=True
    )
    parser.add_argument(
        '-r',
        '--repo',
        help='The name of the repository without the .git extension. The name is not case sensitive.',
        required=True
    )
    parser.add_argument(
        '-t',
        '--token',
        help='a fine-grained access token with repository permissions that at least has "Read and write" on "Secrets" section',
        required=True
    )
    parser.add_argument(
        '-s',
        '--secrete_name',
        help='The name of GitHub Secret as appeared on the Actions secrets list',
        required=True
    )
    parser.add_argument(
        '-v',
        '--secrete_value',
        help='The secret value in its original human-readable form',
        required=False
    )
    parser.add_argument(
        '-f',
        '--secrete_file',
        help='The secret file that contains the secret value',
        required=False
    )
    args = vars(parser.parse_args())

    if args["secrete_value"] is None and args["secrete_file"] is None:
        sys.exit(
            'Error: either "secret-value" (a string) or "secret-file" (a file path) must be given; but neither was given')

    if args["secrete_value"] and args["secrete_file"]:
        sys.exit(
            'Error: either "secret-value" (a string) or "secret-file" (a file path) needs to be given; but both were given'
        )

    repo_owner = args["owner"]
    repo_name = args["repo"]
    token = args['token']
    secret_name = args['secrete_name']
    secrete_value = args["secrete_value"] if args["secrete_value"] else __load_secrete_from_file(args["secrete_file"]);

    (key_id, public_key) = __get_repo_public_key(repo_owner, repo_name, token)
    encrypted_value = __encrypt(public_key, secrete_value)
    __create_or_update_repo_secret(repo_owner, repo_name, token, secret_name, encrypted_value, key_id)
