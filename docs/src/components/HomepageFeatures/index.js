/**
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Build AMI Image',
    Svg: require('@site/static/img/hashicorp-packer.svg').default,
    description: (
      <>
        Create identical images for multiple platforms from a single source configuration.
      </>
    ),
  },
  {
    title: 'Cloud Native Automation',
    Svg: require('@site/static/img/aws.svg').default,
    description: (
      <>
        hashicorp-aws has first-class support for AWS as a cloud provider and frees up dev teams to allow them to focus on adding business value by writing code.
      </>
    ),
  },
  {
    title: 'Deploy to EC2',
    Svg: require('@site/static/img/hashicorp-terraform.svg').default,
    description: (
      <>
        Use infrastructure as code to provision and manage any infrastructure across your organization.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
