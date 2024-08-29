import type { Schema, Attribute } from '@strapi/strapi';

export interface ServicesServices extends Schema.Component {
  collectionName: 'components_services_services';
  info: {
    displayName: 'Services';
    icon: 'gift';
  };
  attributes: {
    icon: Attribute.String & Attribute.CustomField<'plugin::react-icons.icon'>;
    title: Attribute.String;
    description: Attribute.Text;
  };
}

export interface FaqFaq extends Schema.Component {
  collectionName: 'components_faq_faqs';
  info: {
    displayName: 'FAQ';
    icon: 'question';
  };
  attributes: {
    question: Attribute.String;
    answer: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'services.services': ServicesServices;
      'faq.faq': FaqFaq;
    }
  }
}
