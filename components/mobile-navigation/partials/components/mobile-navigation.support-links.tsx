import React from 'react'

import NestedAccordionMenu from "@/components/nested-accordion";

const SupportLinks: React.FC = () => {
  const links = {
    id: 'links-root',
    links: [
      {
        id: 'customersupport',
        links: [
          {
            id: 'contactus',
            name: 'Contact Us'
          },
          {
            id: 'shippingandreturns',
            name: 'Shipping & Returns'
          }
        ],
        name: 'Customer Support'
      },
      {
        id: 'ourcompany',
        links: [
          {
            id: 'aboutus',
            name: 'About Us'
          }
        ],
        name: "Our Company"
      },
      {
        id: 'privacyandsecurity',
        links: [
          {
            id: 'termsandconditions',
            name: "Terms & Conditions"
          },
          {
            id: 'privacypolicy',
            name: "Privacy Policy"
          },
          {
            id: 'sitemap',
            name: "Site Map"
          }
        ],
        name: "Privacy & Security"
      }
    ]
  }

  return (
    <NestedAccordionMenu
      allowMultiple
      fontSizes={['md']}
      fontWeights={['400']}
      item={links}
      itemsKey="links"
      urlBuilder={() => '/'}
    />
  )
}

export default SupportLinks
