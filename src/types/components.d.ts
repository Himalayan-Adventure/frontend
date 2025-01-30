import type { Schema, Attribute } from '@strapi/strapi';

export interface WorkWork extends Schema.Component {
  collectionName: 'components_work_works';
  info: {
    displayName: 'work';
  };
  attributes: {
    title: Attribute.String;
    date: Attribute.Date;
    image: Attribute.Media<'images'> & Attribute.Required;
    description: Attribute.Blocks;
    link: Attribute.String;
  };
}

export interface UserReviewUserReview extends Schema.Component {
  collectionName: 'components_user_review_user_reviews';
  info: {
    displayName: 'User Review';
    description: '';
  };
  attributes: {
    user: Attribute.Relation<
      'user-review.user-review',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    testimonial: Attribute.String;
    summit_date_start: Attribute.Date;
    name: Attribute.String;
    summit_date_end: Attribute.DateTime;
  };
}

export interface UserAboutAbout extends Schema.Component {
  collectionName: 'components_user_about_abouts';
  info: {
    displayName: 'About';
  };
  attributes: {
    facebook: Attribute.String;
    instagram: Attribute.String;
    whatsapp: Attribute.String;
    description: Attribute.Text;
  };
}

export interface StepsSteps extends Schema.Component {
  collectionName: 'components_steps_steps';
  info: {
    displayName: 'steps';
    description: '';
  };
  attributes: {
    step: Attribute.String;
    description: Attribute.Text;
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

export interface PackageTripOfferWhatWeOfffer extends Schema.Component {
  collectionName: 'components_package_trip_offer';
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

export interface PackageThingsToKnowThingsToKnow extends Schema.Component {
  collectionName: 'components_package_things_tk';
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

export interface PackageStepsSteps extends Schema.Component {
  collectionName: 'components_package_steps_steps';
  info: {
    displayName: 'Steps';
    description: '';
  };
  attributes: {
    step: Attribute.Text & Attribute.Required;
  };
}

export interface PackageSponsorHostSponsorHost extends Schema.Component {
  collectionName: 'components_package_sponsor_host';
  info: {
    displayName: 'Sponsor Host';
    description: '';
  };
  attributes: {
    host_name: Attribute.String & Attribute.Required;
    short_description: Attribute.Text;
    logo: Attribute.Media<'images'>;
    socials: Attribute.Component<'package-socials.package-socials'>;
    host_contact: Attribute.String;
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

export interface PackageItineraryTimelineItineraryTimeline
  extends Schema.Component {
  collectionName: 'components_package_itinerary_timeline_itinerary_timelines';
  info: {
    displayName: 'Itinerary Timeline';
    description: '';
  };
  attributes: {
    week: Attribute.Integer;
    description: Attribute.String & Attribute.Required;
    day: Attribute.String & Attribute.Required;
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

export interface PackageItineraryIncludesIncludes extends Schema.Component {
  collectionName: 'components_package_itinerary_includes_includes';
  info: {
    displayName: 'Includes';
    description: '';
  };
  attributes: {
    description: Attribute.String & Attribute.Required;
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
  collectionName: 'components_pckg_custz';
  info: {
    displayName: 'Package Customization';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    icon: Attribute.Media<'images'>;
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

export interface PackageAdventureSpecificationsAdventureSpecifications
  extends Schema.Component {
  collectionName: 'components_package_adv_spec';
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
    max_altitude: Attribute.Float & Attribute.Required;
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

export interface PackageAdventureCustomizationAdventureCustomization
  extends Schema.Component {
  collectionName: 'components_pkg_adv_customz';
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
  collectionName: 'components_package_adv_cultural_exp_cultural_experiences';
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

export interface PackageAccommodationPreferencesAccommodationPreferences
  extends Schema.Component {
  collectionName: 'components_package_acc_pref';
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
  collectionName: 'components_pkg_acc_loc';
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

export interface PackageAccommodationAccommodation extends Schema.Component {
  collectionName: 'components_pkg_acc';
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

export interface OrderListProductOrderList extends Schema.Component {
  collectionName: 'components_order_list_product_order_lists';
  info: {
    displayName: 'Product Order List';
  };
  attributes: {
    product: Attribute.Relation<
      'order-list.product-order-list',
      'oneToOne',
      'api::shop.shop'
    >;
    quantity: Attribute.BigInteger;
  };
}

export interface HomeTestimonialsTestimonials extends Schema.Component {
  collectionName: 'components_home_testimonials_testimonials';
  info: {
    displayName: 'testimonials';
  };
  attributes: {
    image: Attribute.Media<'images'>;
    description: Attribute.Text &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 5;
        maxLength: 500;
      }>;
    name: Attribute.String & Attribute.Required;
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
    description: '';
  };
  attributes: {
    name: Attribute.String;
    icon: Attribute.Media<'images'>;
  };
}

export interface ColorShopColor extends Schema.Component {
  collectionName: 'components_color_shop_colors';
  info: {
    displayName: 'Shop Color';
  };
  attributes: {
    color: Attribute.String;
    image: Attribute.Media<'images'>;
  };
}

export interface FlagFlags extends Schema.Component {
  collectionName: 'components_flag_flags';
  info: {
    displayName: 'Flags';
    description: '';
  };
  attributes: {
    flag_name: Attribute.String;
    flag_icon: Attribute.Media<'images'>;
    flag_map: Attribute.Media<'images'>;
  };
}

export interface AboutServiceAboutServices extends Schema.Component {
  collectionName: 'components_about_service_about_services';
  info: {
    displayName: 'About Services';
  };
  attributes: {
    icon: Attribute.String & Attribute.CustomField<'plugin::react-icons.icon'>;
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
  };
}

export interface AboutResumeResume extends Schema.Component {
  collectionName: 'components_about_resume_resumes';
  info: {
    displayName: 'Resume';
  };
  attributes: {
    first_name: Attribute.String;
    last_name: Attribute.String;
    email: Attribute.Email;
    phone: Attribute.BigInteger;
    location: Attribute.String;
    portfolio: Attribute.String;
    education: Attribute.Component<'about-education.education', true>;
    hard_skill: Attribute.Text;
    technical_skill: Attribute.Text;
    interest: Attribute.Text;
  };
}

export interface AboutEducationEducation extends Schema.Component {
  collectionName: 'components_about_education_educations';
  info: {
    displayName: 'education';
  };
  attributes: {
    education: Attribute.String;
  };
}

export interface AboutContactContact extends Schema.Component {
  collectionName: 'components_about_contact_contacts';
  info: {
    displayName: 'Contact';
  };
  attributes: {
    phone: Attribute.BigInteger;
    email: Attribute.Email;
    birthday: Attribute.Date;
    address: Attribute.String;
    gender: Attribute.Enumeration<['male', 'female', 'other']>;
    reports_to: Attribute.String;
    citizenship: Attribute.String;
    nationality: Attribute.String;
    religion: Attribute.String;
    marital_status: Attribute.Enumeration<['single', 'married', 'divorced']>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'work.work': WorkWork;
      'user-review.user-review': UserReviewUserReview;
      'user-about.about': UserAboutAbout;
      'steps.steps': StepsSteps;
      'planwithus-travel-dates.travel-dates': PlanwithusTravelDatesTravelDates;
      'planwithus-review-finalize.review-and-f-inalize': PlanwithusReviewFinalizeReviewAndFInalize;
      'planwithus-budget.budget': PlanwithusBudgetBudget;
      'package-visuals.maps-and-visuals': PackageVisualsMapsAndVisuals;
      'package-trip-offer.what-we-offfer': PackageTripOfferWhatWeOfffer;
      'package-trip-facts-info.offer-info': PackageTripFactsInfoOfferInfo;
      'package-trip-facts-info.fact-information': PackageTripFactsInfoFactInformation;
      'package-trip-facts.trip-facts': PackageTripFactsTripFacts;
      'package-travel-dates.package-travel-dates': PackageTravelDatesPackageTravelDates;
      'package-things-to-know.things-to-know': PackageThingsToKnowThingsToKnow;
      'package-steps.steps': PackageStepsSteps;
      'package-sponsor-host.sponsor-host': PackageSponsorHostSponsorHost;
      'package-socials.package-socials': PackageSocialsPackageSocials;
      'package-skill-level.skill-level': PackageSkillLevelSkillLevel;
      'package-season.season': PackageSeasonSeason;
      'package-logistics.logistics': PackageLogisticsLogistics;
      'package-itinerary-timeline.itinerary-timeline': PackageItineraryTimelineItineraryTimeline;
      'package-itinerary-others.others': PackageItineraryOthersOthers;
      'package-itinerary.itinerary': PackageItineraryItinerary;
      'package-itinerary-includes.includes': PackageItineraryIncludesIncludes;
      'package-hosted-by.hosted-by': PackageHostedByHostedBy;
      'package-fitness.fitness': PackageFitnessFitness;
      'package-customization.package-customization': PackageCustomizationPackageCustomization;
      'package-grade.grade': PackageGradeGrade;
      'package-adventure-specifications.adventure-specifications': PackageAdventureSpecificationsAdventureSpecifications;
      'package-adventure-transportation.transporation': PackageAdventureTransportationTransporation;
      'package-cost-and-budgeting.cost-and-budgeting': PackageCostAndBudgetingCostAndBudgeting;
      'package-host.package-host': PackageHostPackageHost;
      'package-adventure-customization.adventure-customization': PackageAdventureCustomizationAdventureCustomization;
      'package-adventure-cultural-experiences.cultural-experiences': PackageAdventureCulturalExperiencesCulturalExperiences;
      'package-adventure-addons.add-ons': PackageAdventureAddonsAddOns;
      'package-accommodation-preferences.accommodation-preferences': PackageAccommodationPreferencesAccommodationPreferences;
      'package-accommodation-location.location': PackageAccommodationLocationLocation;
      'package-adventure-activities.adventure-activities': PackageAdventureActivitiesAdventureActivities;
      'package-accommodation.accommodation': PackageAccommodationAccommodation;
      'order-list.product-order-list': OrderListProductOrderList;
      'home-testimonials.testimonials': HomeTestimonialsTestimonials;
      'faq.faq': FaqFaq;
      'accommodation-preference.preference': AccommodationPreferencePreference;
      'color.shop-color': ColorShopColor;
      'flag.flags': FlagFlags;
      'about-service.about-services': AboutServiceAboutServices;
      'about-resume.resume': AboutResumeResume;
      'about-education.education': AboutEducationEducation;
      'about-contact.contact': AboutContactContact;
    }
  }
}
