import type { Schema, Struct } from '@strapi/strapi';

export interface AboutContactContact extends Struct.ComponentSchema {
  collectionName: 'components_about_contact_contacts';
  info: {
    displayName: 'Contact';
  };
  attributes: {
    address: Schema.Attribute.String;
    birthday: Schema.Attribute.Date;
    citizenship: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    gender: Schema.Attribute.Enumeration<['male', 'female', 'other']>;
    marital_status: Schema.Attribute.Enumeration<
      ['single', 'married', 'divorced']
    >;
    nationality: Schema.Attribute.String;
    phone: Schema.Attribute.BigInteger;
    religion: Schema.Attribute.String;
    reports_to: Schema.Attribute.String;
  };
}

export interface AboutEducationEducation extends Struct.ComponentSchema {
  collectionName: 'components_about_education_educations';
  info: {
    displayName: 'education';
  };
  attributes: {
    education: Schema.Attribute.String;
  };
}

export interface AboutResumeResume extends Struct.ComponentSchema {
  collectionName: 'components_about_resume_resumes';
  info: {
    displayName: 'Resume';
  };
  attributes: {
    education: Schema.Attribute.Component<'about-education.education', true>;
    email: Schema.Attribute.Email;
    first_name: Schema.Attribute.String;
    hard_skill: Schema.Attribute.Text;
    interest: Schema.Attribute.Text;
    last_name: Schema.Attribute.String;
    location: Schema.Attribute.String;
    phone: Schema.Attribute.BigInteger;
    portfolio: Schema.Attribute.String;
    technical_skill: Schema.Attribute.Text;
  };
}

export interface AboutServiceAboutServices extends Struct.ComponentSchema {
  collectionName: 'components_about_service_about_services';
  info: {
    displayName: 'About Services';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AccommodationPreferencePreference
  extends Struct.ComponentSchema {
  collectionName: 'components_accommodation_preference_preferences';
  info: {
    description: '';
    displayName: 'Preference';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
  };
}

export interface ColorShopColor extends Struct.ComponentSchema {
  collectionName: 'components_color_shop_colors';
  info: {
    displayName: 'Shop Color';
  };
  attributes: {
    color: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface FaqFaq extends Struct.ComponentSchema {
  collectionName: 'components_faq_faqs';
  info: {
    displayName: 'FAQ';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.String;
  };
}

export interface FlagFlags extends Struct.ComponentSchema {
  collectionName: 'components_flag_flags';
  info: {
    description: '';
    displayName: 'Flags';
  };
  attributes: {
    flag_icon: Schema.Attribute.Media<'images'>;
    flag_map: Schema.Attribute.Media<'images'>;
    flag_name: Schema.Attribute.String;
  };
}

export interface HomeTestimonialsTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_home_testimonials_testimonials';
  info: {
    displayName: 'testimonials';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
        minLength: 5;
      }>;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface OrderListProductOrderList extends Struct.ComponentSchema {
  collectionName: 'components_order_list_product_order_lists';
  info: {
    displayName: 'Product Order List';
  };
  attributes: {
    product: Schema.Attribute.Relation<'oneToOne', 'api::shop.shop'>;
    quantity: Schema.Attribute.BigInteger;
  };
}

export interface PackageAccommodationLocationLocation
  extends Struct.ComponentSchema {
  collectionName: 'components_pkg_acc_loc';
  info: {
    displayName: 'location';
  };
  attributes: {
    name: Schema.Attribute.Enumeration<
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
        'National parks/protected areas',
      ]
    >;
  };
}

export interface PackageAccommodationPreferencesAccommodationPreferences
  extends Struct.ComponentSchema {
  collectionName: 'components_package_acc_pref';
  info: {
    displayName: 'Accommodation Preferences';
  };
  attributes: {
    name: Schema.Attribute.Enumeration<
      [
        'Basic/backpacker',
        'Standard/budget-friendly ',
        'Comfortable/mid-range',
        'Luxury/premium ',
        'Adventure-specific',
        'Eco-friendly/sustainable',
        'Self-Booking',
        'All inclusive',
      ]
    >;
  };
}

export interface PackageAccommodationAccommodation
  extends Struct.ComponentSchema {
  collectionName: 'components_pkg_acc';
  info: {
    description: '';
    displayName: 'Accommodation ';
  };
  attributes: {
    accommodation_preference: Schema.Attribute.Relation<
      'oneToOne',
      'api::accommodation-preference.accommodation-preference'
    >;
  };
}

export interface PackageAdventureActivitiesAdventureActivities
  extends Struct.ComponentSchema {
  collectionName: 'components_package_adventure_activities_adventure_activities';
  info: {
    displayName: 'Adventure Activities';
  };
  attributes: {
    name: Schema.Attribute.Enumeration<
      ['Rock climbing ', 'River rafting ', 'Bungee jumping']
    >;
  };
}

export interface PackageAdventureAddonsAddOns extends Struct.ComponentSchema {
  collectionName: 'components_package_adventure_addons_add_ons';
  info: {
    displayName: 'Add-ons';
  };
  attributes: {
    name: Schema.Attribute.Enumeration<
      ['Helicopter rides', 'Private guides ', 'Spa days ']
    >;
  };
}

export interface PackageAdventureCulturalExperiencesCulturalExperiences
  extends Struct.ComponentSchema {
  collectionName: 'components_package_adv_cultural_exp_cultural_experiences';
  info: {
    displayName: 'Cultural Experiences';
  };
  attributes: {
    name: Schema.Attribute.Enumeration<
      ['Home stays', 'Village tours', 'Traditional cooking', 'Temple visits']
    >;
  };
}

export interface PackageAdventureCustomizationAdventureCustomization
  extends Struct.ComponentSchema {
  collectionName: 'components_pkg_adv_customz';
  info: {
    description: '';
    displayName: 'Adventure Customization';
  };
  attributes: {
    package_customization: Schema.Attribute.Relation<
      'oneToOne',
      'api::package-customization.package-customization'
    >;
  };
}

export interface PackageAdventureSpecificationsAdventureSpecifications
  extends Struct.ComponentSchema {
  collectionName: 'components_package_adv_spec';
  info: {
    description: '';
    displayName: 'Adventure Specifications';
  };
  attributes: {
    duration: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<1>;
    fitness: Schema.Attribute.Component<'package-fitness.fitness', true>;
    fixed_departure: Schema.Attribute.Component<
      'package-travel-dates.package-travel-dates',
      true
    > &
      Schema.Attribute.Required;
    grade: Schema.Attribute.Component<'package-grade.grade', true>;
    max_altitude: Schema.Attribute.Float & Schema.Attribute.Required;
    season: Schema.Attribute.Component<'package-season.season', true> &
      Schema.Attribute.Required;
    skill_level: Schema.Attribute.Component<
      'package-skill-level.skill-level',
      true
    >;
    travel_dates: Schema.Attribute.Component<
      'package-travel-dates.package-travel-dates',
      true
    > &
      Schema.Attribute.Required;
  };
}

export interface PackageAdventureTransportationTransporation
  extends Struct.ComponentSchema {
  collectionName: 'components_package_adventure_transportation_transporations';
  info: {
    displayName: 'Transporation';
  };
  attributes: {
    name: Schema.Attribute.Enumeration<
      ['Private transfers', 'Shared shuttles', 'Flights', 'Self-drive']
    >;
  };
}

export interface PackageCostAndBudgetingCostAndBudgeting
  extends Struct.ComponentSchema {
  collectionName: 'components_package_cost_and_budgeting_cost_and_budgetings';
  info: {
    displayName: 'Cost and Budgeting';
  };
  attributes: {
    exclusions: Schema.Attribute.Blocks;
    highest: Schema.Attribute.BigInteger;
    inclusions: Schema.Attribute.Blocks;
    lowest: Schema.Attribute.BigInteger;
    offer_percent: Schema.Attribute.Integer;
    offer_price: Schema.Attribute.BigInteger;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PackageCustomizationPackageCustomization
  extends Struct.ComponentSchema {
  collectionName: 'components_pckg_custz';
  info: {
    description: '';
    displayName: 'Package Customization';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
  };
}

export interface PackageFitnessFitness extends Struct.ComponentSchema {
  collectionName: 'components_package_fitness_fitnesses';
  info: {
    displayName: 'Fitness';
  };
  attributes: {
    name: Schema.Attribute.Enumeration<
      [
        'Beginner',
        'Intermediate',
        'Advanced',
        'Elite',
        'Sedentary',
        'Active',
        'Athletic',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Beginner'>;
  };
}

export interface PackageGradeGrade extends Struct.ComponentSchema {
  collectionName: 'components_package_grade_grades';
  info: {
    displayName: 'Grade';
  };
  attributes: {
    name: Schema.Attribute.Enumeration<
      [
        'Beginner (grade I)',
        'Intermediate (grade II)',
        'Challenging (grade III)',
        'Strenuous (grade IV)',
        'Extreme (grade V)',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Beginner (grade I)'>;
  };
}

export interface PackageHostPackageHost extends Struct.ComponentSchema {
  collectionName: 'components_package_host_package_hosts';
  info: {
    description: '';
    displayName: 'Package Host';
  };
  attributes: {
    contact: Schema.Attribute.BigInteger;
    hostname: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images'>;
    short_description: Schema.Attribute.Text;
    socials: Schema.Attribute.Component<
      'package-socials.package-socials',
      false
    >;
  };
}

export interface PackageHostedByHostedBy extends Struct.ComponentSchema {
  collectionName: 'components_package_hosted_by_hosted_bies';
  info: {
    description: '';
    displayName: 'Hosted By';
  };
  attributes: {
    contact: Schema.Attribute.BigInteger;
    hostname: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images'>;
    short_description: Schema.Attribute.Text;
    socials: Schema.Attribute.Component<
      'package-socials.package-socials',
      false
    >;
  };
}

export interface PackageItineraryIncludesIncludes
  extends Struct.ComponentSchema {
  collectionName: 'components_package_itinerary_includes_includes';
  info: {
    description: '';
    displayName: 'Includes';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PackageItineraryOthersOthers extends Struct.ComponentSchema {
  collectionName: 'components_package_itinerary_others_others';
  info: {
    description: '';
    displayName: 'Others';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PackageItineraryTimelineItineraryTimeline
  extends Struct.ComponentSchema {
  collectionName: 'components_package_itinerary_timeline_itinerary_timelines';
  info: {
    description: '';
    displayName: 'Itinerary Timeline';
  };
  attributes: {
    day: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.String & Schema.Attribute.Required;
    week: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PackageItineraryItinerary extends Struct.ComponentSchema {
  collectionName: 'components_package_itinerary_itineraries';
  info: {
    description: '';
    displayName: 'Itinerary';
  };
  attributes: {
    excludes: Schema.Attribute.Component<
      'package-itinerary-includes.includes',
      true
    >;
    includes: Schema.Attribute.Component<
      'package-itinerary-includes.includes',
      true
    >;
    others: Schema.Attribute.Component<'package-itinerary-others.others', true>;
    timeline: Schema.Attribute.Component<
      'package-itinerary-timeline.itinerary-timeline',
      true
    >;
  };
}

export interface PackageLogisticsLogistics extends Struct.ComponentSchema {
  collectionName: 'components_package_logistics_logistics';
  info: {
    displayName: 'Logistics';
  };
  attributes: {
    equipment_provided: Schema.Attribute.Blocks;
    packing_list: Schema.Attribute.Blocks;
    permits: Schema.Attribute.Blocks;
    transportation_details: Schema.Attribute.Blocks;
  };
}

export interface PackageSeasonSeason extends Struct.ComponentSchema {
  collectionName: 'components_package_season_seasons';
  info: {
    description: '';
    displayName: 'Season';
  };
  attributes: {
    name: Schema.Attribute.Enumeration<
      ['winter', 'summer', 'spring', 'autumn']
    >;
  };
}

export interface PackageSkillLevelSkillLevel extends Struct.ComponentSchema {
  collectionName: 'components_package_skill_level_skill_levels';
  info: {
    displayName: 'Skill Level';
  };
  attributes: {
    name: Schema.Attribute.Enumeration<
      ['Novice', 'Intermediate', 'Advanced', 'Expert', 'Professional', 'Elite']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Novice'>;
  };
}

export interface PackageSocialsPackageSocials extends Struct.ComponentSchema {
  collectionName: 'components_package_socials_package_socials';
  info: {
    displayName: 'Package Socials';
  };
  attributes: {
    facebook: Schema.Attribute.String;
    gmail: Schema.Attribute.String;
    instagram: Schema.Attribute.String;
    linkedin: Schema.Attribute.String;
    messenger: Schema.Attribute.String;
    tiktok: Schema.Attribute.String;
    tripadvisor: Schema.Attribute.String;
    twitter: Schema.Attribute.String;
    whatsapp: Schema.Attribute.String;
    youtube: Schema.Attribute.String;
  };
}

export interface PackageSponsorHostSponsorHost extends Struct.ComponentSchema {
  collectionName: 'components_package_sponsor_host';
  info: {
    description: '';
    displayName: 'Sponsor Host';
  };
  attributes: {
    host_contact: Schema.Attribute.String;
    host_name: Schema.Attribute.String & Schema.Attribute.Required;
    logo: Schema.Attribute.Media<'images'>;
    short_description: Schema.Attribute.Text;
    socials: Schema.Attribute.Component<
      'package-socials.package-socials',
      false
    >;
  };
}

export interface PackageStepsSteps extends Struct.ComponentSchema {
  collectionName: 'components_package_steps_steps';
  info: {
    description: '';
    displayName: 'Steps';
  };
  attributes: {
    step: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface PackageThingsToKnowThingsToKnow
  extends Struct.ComponentSchema {
  collectionName: 'components_package_things_tk';
  info: {
    displayName: 'Things to know';
  };
  attributes: {
    things_info: Schema.Attribute.Component<
      'package-trip-facts-info.fact-information',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface PackageTravelDatesPackageTravelDates
  extends Struct.ComponentSchema {
  collectionName: 'components_package_travel_dates_package_travel_dates';
  info: {
    displayName: 'Package Travel Dates';
  };
  attributes: {
    date: Schema.Attribute.DateTime & Schema.Attribute.Required;
  };
}

export interface PackageTripFactsInfoFactInformation
  extends Struct.ComponentSchema {
  collectionName: 'components_package_trip_facts_info_fact_informations';
  info: {
    description: '';
    displayName: 'Fact Information';
  };
  attributes: {
    details: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PackageTripFactsInfoOfferInfo extends Struct.ComponentSchema {
  collectionName: 'components_package_trip_facts_info_offer_infos';
  info: {
    displayName: 'Offer Info';
  };
  attributes: {};
}

export interface PackageTripFactsTripFacts extends Struct.ComponentSchema {
  collectionName: 'components_package_trip_facts_trip_facts';
  info: {
    description: '';
    displayName: 'Trip Facts';
  };
  attributes: {
    fact_info: Schema.Attribute.Component<
      'package-trip-facts-info.fact-information',
      true
    >;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface PackageTripOfferWhatWeOfffer extends Struct.ComponentSchema {
  collectionName: 'components_package_trip_offer';
  info: {
    displayName: 'What we offfer';
  };
  attributes: {
    offer_info: Schema.Attribute.Component<
      'package-trip-facts-info.fact-information',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface PackageVisualsMapsAndVisuals extends Struct.ComponentSchema {
  collectionName: 'components_package_visuals_maps_and_visuals';
  info: {
    displayName: 'Maps and Visuals';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images'>;
    url: Schema.Attribute.String;
  };
}

export interface PlanwithusBudgetBudget extends Struct.ComponentSchema {
  collectionName: 'components_planwithus_budget_budgets';
  info: {
    displayName: 'Budget';
  };
  attributes: {
    budget_range_end: Schema.Attribute.BigInteger;
    budget_range_start: Schema.Attribute.BigInteger;
    decide_later: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    fixed_budget: Schema.Attribute.BigInteger;
  };
}

export interface PlanwithusReviewFinalizeReviewAndFInalize
  extends Struct.ComponentSchema {
  collectionName: 'components_planwithus_review_finalize_review_and_f_inalizes';
  info: {
    displayName: 'Review & FInalize';
  };
  attributes: {
    email: Schema.Attribute.Email;
    message: Schema.Attribute.Text;
    name: Schema.Attribute.String;
  };
}

export interface PlanwithusTravelDatesTravelDates
  extends Struct.ComponentSchema {
  collectionName: 'components_planwithus_travel_dates_travel_dates';
  info: {
    description: '';
    displayName: 'Travel Dates';
  };
  attributes: {
    decide_later: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    exact_date_end: Schema.Attribute.Date;
    exact_date_start: Schema.Attribute.Date;
    flexible_date_end: Schema.Attribute.Date;
    flexible_date_start: Schema.Attribute.Date;
  };
}

export interface StepsSteps extends Struct.ComponentSchema {
  collectionName: 'components_steps_steps';
  info: {
    description: '';
    displayName: 'steps';
  };
  attributes: {
    description: Schema.Attribute.Text;
    step: Schema.Attribute.String;
  };
}

export interface UserAboutAbout extends Struct.ComponentSchema {
  collectionName: 'components_user_about_abouts';
  info: {
    displayName: 'About';
  };
  attributes: {
    description: Schema.Attribute.Text;
    facebook: Schema.Attribute.String;
    instagram: Schema.Attribute.String;
    whatsapp: Schema.Attribute.String;
  };
}

export interface UserReviewUserReview extends Struct.ComponentSchema {
  collectionName: 'components_user_review_user_reviews';
  info: {
    description: '';
    displayName: 'User Review';
  };
  attributes: {
    name: Schema.Attribute.String;
    summit_date_end: Schema.Attribute.DateTime;
    summit_date_start: Schema.Attribute.Date;
    testimonial: Schema.Attribute.String;
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface WorkWork extends Struct.ComponentSchema {
  collectionName: 'components_work_works';
  info: {
    displayName: 'work';
  };
  attributes: {
    date: Schema.Attribute.Date;
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'about-contact.contact': AboutContactContact;
      'about-education.education': AboutEducationEducation;
      'about-resume.resume': AboutResumeResume;
      'about-service.about-services': AboutServiceAboutServices;
      'accommodation-preference.preference': AccommodationPreferencePreference;
      'color.shop-color': ColorShopColor;
      'faq.faq': FaqFaq;
      'flag.flags': FlagFlags;
      'home-testimonials.testimonials': HomeTestimonialsTestimonials;
      'order-list.product-order-list': OrderListProductOrderList;
      'package-accommodation-location.location': PackageAccommodationLocationLocation;
      'package-accommodation-preferences.accommodation-preferences': PackageAccommodationPreferencesAccommodationPreferences;
      'package-accommodation.accommodation': PackageAccommodationAccommodation;
      'package-adventure-activities.adventure-activities': PackageAdventureActivitiesAdventureActivities;
      'package-adventure-addons.add-ons': PackageAdventureAddonsAddOns;
      'package-adventure-cultural-experiences.cultural-experiences': PackageAdventureCulturalExperiencesCulturalExperiences;
      'package-adventure-customization.adventure-customization': PackageAdventureCustomizationAdventureCustomization;
      'package-adventure-specifications.adventure-specifications': PackageAdventureSpecificationsAdventureSpecifications;
      'package-adventure-transportation.transporation': PackageAdventureTransportationTransporation;
      'package-cost-and-budgeting.cost-and-budgeting': PackageCostAndBudgetingCostAndBudgeting;
      'package-customization.package-customization': PackageCustomizationPackageCustomization;
      'package-fitness.fitness': PackageFitnessFitness;
      'package-grade.grade': PackageGradeGrade;
      'package-host.package-host': PackageHostPackageHost;
      'package-hosted-by.hosted-by': PackageHostedByHostedBy;
      'package-itinerary-includes.includes': PackageItineraryIncludesIncludes;
      'package-itinerary-others.others': PackageItineraryOthersOthers;
      'package-itinerary-timeline.itinerary-timeline': PackageItineraryTimelineItineraryTimeline;
      'package-itinerary.itinerary': PackageItineraryItinerary;
      'package-logistics.logistics': PackageLogisticsLogistics;
      'package-season.season': PackageSeasonSeason;
      'package-skill-level.skill-level': PackageSkillLevelSkillLevel;
      'package-socials.package-socials': PackageSocialsPackageSocials;
      'package-sponsor-host.sponsor-host': PackageSponsorHostSponsorHost;
      'package-steps.steps': PackageStepsSteps;
      'package-things-to-know.things-to-know': PackageThingsToKnowThingsToKnow;
      'package-travel-dates.package-travel-dates': PackageTravelDatesPackageTravelDates;
      'package-trip-facts-info.fact-information': PackageTripFactsInfoFactInformation;
      'package-trip-facts-info.offer-info': PackageTripFactsInfoOfferInfo;
      'package-trip-facts.trip-facts': PackageTripFactsTripFacts;
      'package-trip-offer.what-we-offfer': PackageTripOfferWhatWeOfffer;
      'package-visuals.maps-and-visuals': PackageVisualsMapsAndVisuals;
      'planwithus-budget.budget': PlanwithusBudgetBudget;
      'planwithus-review-finalize.review-and-f-inalize': PlanwithusReviewFinalizeReviewAndFInalize;
      'planwithus-travel-dates.travel-dates': PlanwithusTravelDatesTravelDates;
      'steps.steps': StepsSteps;
      'user-about.about': UserAboutAbout;
      'user-review.user-review': UserReviewUserReview;
      'work.work': WorkWork;
    }
  }
}
