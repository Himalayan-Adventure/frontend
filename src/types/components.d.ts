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

export interface PlanwithusReviewFinalizeReviewAndFInalize
  extends Schema.Component {
  collectionName: 'components_planwithus_review_finalize_review_and_f_inalizes';
  info: {
    displayName: 'Review & FInalize';
  };
  attributes: {
    name: Attribute.String;
    email: Attribute.Email;
    message: Attribute.Text;
  };
}

export interface PlanwithusTravelDatesTravelDates extends Schema.Component {
  collectionName: 'components_planwithus_travel_dates_travel_dates';
  info: {
    displayName: 'Travel Dates';
    description: '';
  };
  attributes: {
    exact_date_start: Attribute.Date;
    exact_date_end: Attribute.Date;
    flexible_date_start: Attribute.Date;
    flexible_date_end: Attribute.Date;
    decide_later: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

export interface PlanwithusBudgetBudget extends Schema.Component {
  collectionName: 'components_planwithus_budget_budgets';
  info: {
    displayName: 'Budget';
  };
  attributes: {
    fixed_budget: Attribute.BigInteger;
    budget_range_start: Attribute.BigInteger;
    budget_range_end: Attribute.BigInteger;
    decide_later: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

export interface PackageVisualsMapsAndVisuals extends Schema.Component {
  collectionName: 'components_package_visuals_maps_and_visuals';
  info: {
    displayName: 'Maps and Visuals';
  };
  attributes: {
    Image: Attribute.Media<'images'>;
    url: Attribute.String;
  };
}

export interface PackageTripFactsInfoOfferInfo extends Schema.Component {
  collectionName: 'components_package_trip_facts_info_offer_infos';
  info: {
    displayName: 'Offer Info';
  };
  attributes: {};
}

export interface PackageTripFactsInfoFactInformation extends Schema.Component {
  collectionName: 'components_package_trip_facts_info_fact_informations';
  info: {
    displayName: 'Fact Information';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    details: Attribute.Text;
    icon: Attribute.String & Attribute.CustomField<'plugin::react-icons.icon'>;
  };
}

export interface PackageTripOfferWhatWeOfffer extends Schema.Component {
  collectionName: 'components_package_trip_offer_what_we_offfers';
  info: {
    displayName: 'What we offfer';
  };
  attributes: {
    title: Attribute.String;
    offer_info: Attribute.Component<
      'package-trip-facts-info.fact-information',
      true
    >;
  };
}

export interface PackageTripFactsTripFacts extends Schema.Component {
  collectionName: 'components_package_trip_facts_trip_facts';
  info: {
    displayName: 'Trip Facts';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    fact_info: Attribute.Component<
      'package-trip-facts-info.fact-information',
      true
    >;
    image: Attribute.Media<'images'>;
  };
}

export interface PackageTravelDatesPackageTravelDates extends Schema.Component {
  collectionName: 'components_package_travel_dates_package_travel_dates';
  info: {
    displayName: 'Package Travel Dates';
  };
  attributes: {
    date: Attribute.DateTime & Attribute.Required;
  };
}

export interface PackageSponsorHostSponsorHost extends Schema.Component {
  collectionName: 'components_package_sponsor_host_sponsor_hosts';
  info: {
    displayName: 'Sponsor Host';
    description: '';
  };
  attributes: {
    host_name: Attribute.String & Attribute.Required;
    host_contact: Attribute.BigInteger;
    short_description: Attribute.Text;
    logo: Attribute.Media<'images'>;
    socials: Attribute.Component<'package-socials.package-socials'>;
  };
}

export interface PackageThingsToKnowThingsToKnow extends Schema.Component {
  collectionName: 'components_package_things_to_know_things_to_knows';
  info: {
    displayName: 'Things to know';
  };
  attributes: {
    title: Attribute.String;
    things_info: Attribute.Component<
      'package-trip-facts-info.fact-information',
      true
    >;
  };
}

export interface PackageSocialsPackageSocials extends Schema.Component {
  collectionName: 'components_package_socials_package_socials';
  info: {
    displayName: 'Package Socials';
  };
  attributes: {
    facebook: Attribute.String;
    instagram: Attribute.String;
    linkedin: Attribute.String;
    whatsapp: Attribute.String;
    twitter: Attribute.String;
    tiktok: Attribute.String;
    messenger: Attribute.String;
    youtube: Attribute.String;
    gmail: Attribute.String;
    tripadvisor: Attribute.String;
  };
}

export interface PackageSkillLevelSkillLevel extends Schema.Component {
  collectionName: 'components_package_skill_level_skill_levels';
  info: {
    displayName: 'Skill Level';
  };
  attributes: {
    name: Attribute.Enumeration<
      ['Novice', 'Intermediate', 'Advanced', 'Expert', 'Professional', 'Elite']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'Novice'>;
  };
}

export interface PackageSeasonSeason extends Schema.Component {
  collectionName: 'components_package_season_seasons';
  info: {
    displayName: 'Season';
    description: '';
  };
  attributes: {
    name: Attribute.Enumeration<['winter', 'summer', 'spring', 'autumn']>;
  };
}

export interface PackageLogisticsLogistics extends Schema.Component {
  collectionName: 'components_package_logistics_logistics';
  info: {
    displayName: 'Logistics';
  };
  attributes: {
    transportation_details: Attribute.Blocks;
    equipment_provided: Attribute.Blocks;
    packing_list: Attribute.Blocks;
    permits: Attribute.Blocks;
  };
}

export interface PackageItineraryOthersOthers extends Schema.Component {
  collectionName: 'components_package_itinerary_others_others';
  info: {
    displayName: 'Others';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Blocks;
  };
}

export interface PackageItineraryIncludesIncludes extends Schema.Component {
  collectionName: 'components_package_itinerary_includes_includes';
  info: {
    displayName: 'Includes';
  };
  attributes: {
    description: Attribute.Text;
  };
}

export interface PackageItineraryTimelineItineraryTimeline
  extends Schema.Component {
  collectionName: 'components_package_itinerary_timeline_itinerary_timelines';
  info: {
    displayName: 'Itinerary Timeline';
  };
  attributes: {
    week: Attribute.Integer;
    day: Attribute.Integer;
    description: Attribute.String & Attribute.Required;
  };
}

export interface PackageItineraryItinerary extends Schema.Component {
  collectionName: 'components_package_itinerary_itineraries';
  info: {
    displayName: 'Itinerary';
    description: '';
  };
  attributes: {
    timeline: Attribute.Component<
      'package-itinerary-timeline.itinerary-timeline',
      true
    >;
    includes: Attribute.Component<'package-itinerary-includes.includes', true>;
    excludes: Attribute.Component<'package-itinerary-includes.includes', true>;
    others: Attribute.Component<'package-itinerary-others.others', true>;
  };
}

export interface PackageHostedByHostedBy extends Schema.Component {
  collectionName: 'components_package_hosted_by_hosted_bies';
  info: {
    displayName: 'Hosted By';
    description: '';
  };
  attributes: {
    hostname: Attribute.String;
    contact: Attribute.BigInteger;
    short_description: Attribute.Text;
    logo: Attribute.Media<'images'>;
    socials: Attribute.Component<'package-socials.package-socials'>;
  };
}

export interface PackageHostPackageHost extends Schema.Component {
  collectionName: 'components_package_host_package_hosts';
  info: {
    displayName: 'Package Host';
    description: '';
  };
  attributes: {
    hostname: Attribute.String;
    contact: Attribute.BigInteger;
    short_description: Attribute.Text;
    logo: Attribute.Media<'images'>;
    socials: Attribute.Component<'package-socials.package-socials'>;
  };
}

export interface PackageGradeGrade extends Schema.Component {
  collectionName: 'components_package_grade_grades';
  info: {
    displayName: 'Grade';
  };
  attributes: {
    name: Attribute.Enumeration<
      [
        'Beginner (grade I)',
        'Intermediate (grade II)',
        'Challenging (grade III)',
        'Strenuous (grade IV)',
        'Extreme (grade V)'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'Beginner (grade I)'>;
  };
}

export interface PackageFitnessFitness extends Schema.Component {
  collectionName: 'components_package_fitness_fitnesses';
  info: {
    displayName: 'Fitness';
  };
  attributes: {
    name: Attribute.Enumeration<
      [
        'Beginner',
        'Intermediate',
        'Advanced',
        'Elite',
        'Sedentary',
        'Active',
        'Athletic'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'Beginner'>;
  };
}

export interface PackageCustomizationPackageCustomization
  extends Schema.Component {
  collectionName: 'components_package_customization_package_customizations';
  info: {
    displayName: 'Package Customization';
  };
  attributes: {
    name: Attribute.String;
  };
}

export interface PackageCostAndBudgetingCostAndBudgeting
  extends Schema.Component {
  collectionName: 'components_package_cost_and_budgeting_cost_and_budgetings';
  info: {
    displayName: 'Cost and Budgeting';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    lowest: Attribute.BigInteger;
    highest: Attribute.BigInteger;
    offer_price: Attribute.BigInteger;
    offer_percent: Attribute.Integer;
    inclusions: Attribute.Blocks;
    exclusions: Attribute.Blocks;
  };
}

export interface PackageAdventureTransportationTransporation
  extends Schema.Component {
  collectionName: 'components_package_adventure_transportation_transporations';
  info: {
    displayName: 'Transporation';
  };
  attributes: {
    name: Attribute.Enumeration<
      ['Private transfers', 'Shared shuttles', 'Flights', 'Self-drive']
    >;
  };
}

export interface PackageAdventureSpecificationsAdventureSpecifications
  extends Schema.Component {
  collectionName: 'components_package_adventure_specifications_adventure_specifications';
  info: {
    displayName: 'Adventure Specifications';
    description: '';
  };
  attributes: {
    travel_dates: Attribute.Component<
      'package-travel-dates.package-travel-dates',
      true
    > &
      Attribute.Required;
    fixed_departure: Attribute.Component<
      'package-travel-dates.package-travel-dates',
      true
    > &
      Attribute.Required;
    season: Attribute.Component<'package-season.season', true> &
      Attribute.Required;
    grade: Attribute.Component<'package-grade.grade', true>;
    fitness: Attribute.Component<'package-fitness.fitness', true>;
    skill_level: Attribute.Component<'package-skill-level.skill-level', true>;
    duration: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<1>;
    max_altitude: Attribute.BigInteger & Attribute.Required;
  };
}

export interface PackageAdventureCustomizationAdventureCustomization
  extends Schema.Component {
  collectionName: 'components_package_adventure_customization_adventure_customizations';
  info: {
    displayName: 'Adventure Customization';
    description: '';
  };
  attributes: {
    package_customization: Attribute.Relation<
      'package-adventure-customization.adventure-customization',
      'oneToOne',
      'api::package-customization.package-customization'
    >;
  };
}

export interface PackageAdventureCulturalExperiencesCulturalExperiences
  extends Schema.Component {
  collectionName: 'components_package_adventure_cultural_experiences_cultural_experiences';
  info: {
    displayName: 'Cultural Experiences';
  };
  attributes: {
    name: Attribute.Enumeration<
      ['Home stays', 'Village tours', 'Traditional cooking', 'Temple visits']
    >;
  };
}

export interface PackageAdventureAddonsAddOns extends Schema.Component {
  collectionName: 'components_package_adventure_addons_add_ons';
  info: {
    displayName: 'Add-ons';
  };
  attributes: {
    name: Attribute.Enumeration<
      ['Helicopter rides', 'Private guides ', 'Spa days ']
    >;
  };
}

export interface PackageAdventureActivitiesAdventureActivities
  extends Schema.Component {
  collectionName: 'components_package_adventure_activities_adventure_activities';
  info: {
    displayName: 'Adventure Activities';
  };
  attributes: {
    name: Attribute.Enumeration<
      ['Rock climbing ', 'River rafting ', 'Bungee jumping']
    >;
  };
}

export interface PackageAccommodationPreferencesAccommodationPreferences
  extends Schema.Component {
  collectionName: 'components_package_accommodation_preferences_accommodation_preferences';
  info: {
    displayName: 'Accommodation Preferences';
  };
  attributes: {
    name: Attribute.Enumeration<
      [
        'Basic/backpacker',
        'Standard/budget-friendly ',
        'Comfortable/mid-range',
        'Luxury/premium ',
        'Adventure-specific',
        'Eco-friendly/sustainable',
        'Self-Booking',
        'All inclusive'
      ]
    >;
  };
}

export interface PackageAccommodationLocationLocation extends Schema.Component {
  collectionName: 'components_package_accommodation_location_locations';
  info: {
    displayName: 'location';
  };
  attributes: {
    name: Attribute.Enumeration<
      [
        'Urban',
        'Suburban',
        'Coastal/Beachfront',
        'Mountain',
        'Wilderness/ Remote',
        'Desert',
        'Island ',
        'Forest/Jungle ',
        'Lakeside/Riverside',
        'Historical/Cultural sites',
        'National parks/protected areas'
      ]
    >;
  };
}

export interface PackageAccommodationAccommodation extends Schema.Component {
  collectionName: 'components_package_accommodation_accommodation_s';
  info: {
    displayName: 'Accommodation ';
    description: '';
  };
  attributes: {
    accommodation_preference: Attribute.Relation<
      'package-accommodation.accommodation',
      'oneToOne',
      'api::accommodation-preference.accommodation-preference'
    >;
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

export interface AccommodationPreferencePreference extends Schema.Component {
  collectionName: 'components_accommodation_preference_preferences';
  info: {
    displayName: 'Preference';
  };
  attributes: {
    name: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'services.services': ServicesServices;
      'planwithus-review-finalize.review-and-f-inalize': PlanwithusReviewFinalizeReviewAndFInalize;
      'planwithus-travel-dates.travel-dates': PlanwithusTravelDatesTravelDates;
      'planwithus-budget.budget': PlanwithusBudgetBudget;
      'package-visuals.maps-and-visuals': PackageVisualsMapsAndVisuals;
      'package-trip-facts-info.offer-info': PackageTripFactsInfoOfferInfo;
      'package-trip-facts-info.fact-information': PackageTripFactsInfoFactInformation;
      'package-trip-offer.what-we-offfer': PackageTripOfferWhatWeOfffer;
      'package-trip-facts.trip-facts': PackageTripFactsTripFacts;
      'package-travel-dates.package-travel-dates': PackageTravelDatesPackageTravelDates;
      'package-sponsor-host.sponsor-host': PackageSponsorHostSponsorHost;
      'package-things-to-know.things-to-know': PackageThingsToKnowThingsToKnow;
      'package-socials.package-socials': PackageSocialsPackageSocials;
      'package-skill-level.skill-level': PackageSkillLevelSkillLevel;
      'package-season.season': PackageSeasonSeason;
      'package-logistics.logistics': PackageLogisticsLogistics;
      'package-itinerary-others.others': PackageItineraryOthersOthers;
      'package-itinerary-includes.includes': PackageItineraryIncludesIncludes;
      'package-itinerary-timeline.itinerary-timeline': PackageItineraryTimelineItineraryTimeline;
      'package-itinerary.itinerary': PackageItineraryItinerary;
      'package-hosted-by.hosted-by': PackageHostedByHostedBy;
      'package-host.package-host': PackageHostPackageHost;
      'package-grade.grade': PackageGradeGrade;
      'package-fitness.fitness': PackageFitnessFitness;
      'package-customization.package-customization': PackageCustomizationPackageCustomization;
      'package-cost-and-budgeting.cost-and-budgeting': PackageCostAndBudgetingCostAndBudgeting;
      'package-adventure-transportation.transporation': PackageAdventureTransportationTransporation;
      'package-adventure-specifications.adventure-specifications': PackageAdventureSpecificationsAdventureSpecifications;
      'package-adventure-customization.adventure-customization': PackageAdventureCustomizationAdventureCustomization;
      'package-adventure-cultural-experiences.cultural-experiences': PackageAdventureCulturalExperiencesCulturalExperiences;
      'package-adventure-addons.add-ons': PackageAdventureAddonsAddOns;
      'package-adventure-activities.adventure-activities': PackageAdventureActivitiesAdventureActivities;
      'package-accommodation-preferences.accommodation-preferences': PackageAccommodationPreferencesAccommodationPreferences;
      'package-accommodation-location.location': PackageAccommodationLocationLocation;
      'package-accommodation.accommodation': PackageAccommodationAccommodation;
      'faq.faq': FaqFaq;
      'accommodation-preference.preference': AccommodationPreferencePreference;
    }
  }
}
