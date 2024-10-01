import type { Schema, Attribute } from '@strapi/strapi';

export interface PackageThingsToKnowThingsToKnow extends Schema.Component {
  collectionName: 'components_package_things_to_know_things_to_knows';
  info: {
    displayName: 'Things to know';
  };
  attributes: {
    icon: Attribute.String & Attribute.CustomField<'plugin::react-icons.icon'>;
    info: Attribute.String;
  };
}

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

export interface PackageRatingRating extends Schema.Component {
  collectionName: 'components_package_rating_ratings';
  info: {
    displayName: 'rating';
    icon: 'star';
  };
  attributes: {
    review: Attribute.Text;
    rating: Attribute.Integer & Attribute.DefaultTo<0>;
  };
}

export interface PackageItenaryItenary extends Schema.Component {
  collectionName: 'components_package_itenary_itenaries';
  info: {
    displayName: 'itenary';
    icon: 'bulletList';
  };
  attributes: {
    day: Attribute.String;
  };
}

export interface PackageFactsFacts extends Schema.Component {
  collectionName: 'components_package_facts_facts';
  info: {
    displayName: 'facts';
    icon: 'cube';
  };
  attributes: {
    name: Attribute.String;
    icon: Attribute.String & Attribute.CustomField<'plugin::react-icons.icon'>;
    value: Attribute.String;
  };
}

export interface PackageDepartureDeparture extends Schema.Component {
  collectionName: 'components_package_departure_departures';
  info: {
    displayName: 'departure';
    icon: 'calendar';
  };
  attributes: {
    start: Attribute.Date;
    end: Attribute.Date;
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
      'package-things-to-know.things-to-know': PackageThingsToKnowThingsToKnow;
      'services.services': ServicesServices;
      'package-rating.rating': PackageRatingRating;
      'package-itenary.itenary': PackageItenaryItenary;
      'package-facts.facts': PackageFactsFacts;
      'package-departure.departure': PackageDepartureDeparture;
      'faq.faq': FaqFaq;
    }
  }
}
