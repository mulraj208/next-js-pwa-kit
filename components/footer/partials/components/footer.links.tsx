import React from 'react'

import styles from '../../footer.styles'
import LinksList, {LinkListVariant} from "@/components/links-list";

type FooterLinksProps = {
  spacing?: number
  linkListVariant?: LinkListVariant
}

export const CustomerSupportLinks: React.FC<FooterLinksProps> = props => {
  const { spacing } = props
  const heading = {
    text: "Customer Support",
    styles: styles.linksHeading
  }
  const links = [
    {
      href: '/',
      text: "Contact Us"
    },
    {
      href: '/',
      text: "Shipping"
    }
  ]

  return <LinksList heading={heading} links={links} spacing={spacing} variant="vertical" />
}

export const AccountLinks: React.FC<FooterLinksProps> = props => {
  const { spacing } = props
  const heading = {
    text: "Account",
    styles: styles.linksHeading
  }
  const links = [
    {
      href: '/',
      text: "Order Status"
    },
    {
      href: '/',
      text: "Sign in or create account"
    }
  ]

  return <LinksList heading={heading} links={links} spacing={spacing} variant="vertical" />
}

export const CompanyLinks: React.FC<FooterLinksProps> = props => {
  const { spacing } = props
  const heading = {
    text: "Our Company",
    styles: styles.linksHeading
  }
  const links = [
    {
      href: '/',
      text: "Store Locator"
    },
    {
      href: '/',
      text: "About Us"
    }
  ]

  return <LinksList heading={heading} links={links} spacing={spacing} variant="vertical" />
}

export const LegalLinks: React.FC<FooterLinksProps> = props => {
  const { linkListVariant } = props
  const links = [
    {
      href: '/',
      text: "Terms & Conditions"
    },
    {
      href: '/',
      text: "Privacy Policy"
    },
    {
      href: '/',
      text: "Site Map"
    }
  ]

  return <LinksList color="gray.200" links={links} variant={linkListVariant} />
}
