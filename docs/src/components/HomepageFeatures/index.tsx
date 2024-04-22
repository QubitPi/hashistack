/**
 * Copyright 2024 Paion Data
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

import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { useColorMode } from '@docusaurus/theme-common'

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Immutable Infrastructure',
    Svg: require('@site/static/img/hashicorp-logo.svg').default,
    scale: 1,
    id: 'hashicorp-logo',
    description: (
      <>
        IIaaS eliminates all manual management of IT infrastructure using HashiCorp's Packer and Terraform and brings
        software production more closer to individual level
      </>
    ),
  },
  {
    title: 'Cloud Native',
    Svg: require('@site/static/img/alicloud.svg').default,
    scale: 1,
    id: 'not-used',
    description: (
      <>
        Designed for Cloud native, IIaaS has first-class support for Ali Cloud as SaaS platform and flexible plugin
        architecture which handles nearly any cloud provider for deployment
      </>
    ),
  },
  {
    title: 'Open Source',
    Svg: require('@site/static/img/apache.svg').default,
    scale: 0.7,
    id: 'not-used',
    description: (
      <>
        IIaaS is 100% open source and available on
        <a href="https://github.com/paion-data/immutable-infrastructure-as-a-service"> Github</a>. Released under the
        commercial-friendly
        <a href="http://www.apache.org/licenses/LICENSE-2.0.html"> Apache License, Version 2.0.</a>
      </>
    ),
  },
];

function Feature({title, Svg, scale, id, description}: FeatureItem) {
  const {colorMode} = useColorMode()

  let fill = undefined

  if ( id === 'hashicorp-logo' && colorMode === 'light' ) {
    fill = 'black'
  } else if ( id === 'hashicorp-logo' && colorMode === 'dark') {
    fill = 'white'
  }

  if ( id === 'production-quality' && colorMode === 'light' ) {
    fill = 'black'
  } else if ( id === 'production-quality' && colorMode === 'dark') {
    fill = 'white'
  }

  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} transform={"scale(" + scale + ")"} fill={fill} id={id} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
