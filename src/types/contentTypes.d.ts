import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginReactIconsIconlibrary extends Schema.CollectionType {
  collectionName: 'iconlibrary';
  info: {
    singularName: 'iconlibrary';
    pluralName: 'iconlibraries';
    displayName: 'IconLibrary';
  };
  options: {
    draftAndPublish: false;
    comment: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    abbreviation: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        maxLength: 3;
      }>;
    isEnabled: Attribute.Boolean & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::react-icons.iconlibrary',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::react-icons.iconlibrary',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    userType: Attribute.Enumeration<['customer', 'merchant']> &
      Attribute.DefaultTo<'customer'>;
    profilePicture: Attribute.Media<'images'>;
    packages: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::package.package'
    >;
    works: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::work.work'
    >;
    about: Attribute.Component<'user-about.about'>;
    resume: Attribute.Component<'about-resume.resume'>;
    contact: Attribute.Component<'about-contact.contact'>;
    climbers_booked: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'api::package.package'
    >;
    services: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::service.service'
    >;
    appointments: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::appointment.appointment'
    >;
    inquiries: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::inquiry.inquiry'
    >;
    team: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::team.team'
    >;
    projects: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::project.project'
    >;
    quote: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::quote.quote'
    >;
    work: Attribute.Component<'work.work', true>;
    product_order: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::product-order.product-order'
    >;
    calendars: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::calendar.calendar'
    >;
    service_requests: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::service-request.service-request'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAboutUsAboutUs extends Schema.SingleType {
  collectionName: 'about_uses';
  info: {
    singularName: 'about-us';
    pluralName: 'about-uses';
    displayName: 'About Us';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    description: Attribute.RichText & Attribute.Required;
    image: Attribute.Media<'images', true>;
    service: Attribute.Component<'about-service.about-services', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::about-us.about-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::about-us.about-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAccommodationPreferenceAccommodationPreference
  extends Schema.CollectionType {
  collectionName: 'accommodation_preferences';
  info: {
    singularName: 'accommodation-preference';
    pluralName: 'accommodation-preferences';
    displayName: 'Accommodation Preference';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    preference: Attribute.Component<
      'accommodation-preference.preference',
      true
    >;
    location: Attribute.Component<'accommodation-preference.preference', true>;
    packages: Attribute.Relation<
      'api::accommodation-preference.accommodation-preference',
      'oneToMany',
      'api::package.package'
    >;
    name: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::accommodation-preference.accommodation-preference',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::accommodation-preference.accommodation-preference',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAdminAppointmentAdminAppointment
  extends Schema.CollectionType {
  collectionName: 'admin_appointments';
  info: {
    singularName: 'admin-appointment';
    pluralName: 'admin-appointments';
    displayName: 'Admin Appointment';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    phone: Attribute.String & Attribute.Required;
    email: Attribute.Email & Attribute.Required;
    expectation: Attribute.Text & Attribute.Required;
    appointment_date: Attribute.DateTime &
      Attribute.Required &
      Attribute.DefaultTo<'2024-12-01T03:15:52.780Z'>;
    package: Attribute.Relation<
      'api::admin-appointment.admin-appointment',
      'oneToOne',
      'api::package.package'
    >;
    service: Attribute.Relation<
      'api::admin-appointment.admin-appointment',
      'oneToOne',
      'api::service.service'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::admin-appointment.admin-appointment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::admin-appointment.admin-appointment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAdminInquiryAdminInquiry extends Schema.CollectionType {
  collectionName: 'admin_inquiries';
  info: {
    singularName: 'admin-inquiry';
    pluralName: 'admin-inquiries';
    displayName: 'Admin Inquiry';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    phone: Attribute.String & Attribute.Required;
    email: Attribute.Email & Attribute.Required;
    subject: Attribute.String & Attribute.Required;
    message: Attribute.Text & Attribute.Required;
    package: Attribute.Relation<
      'api::admin-inquiry.admin-inquiry',
      'oneToOne',
      'api::package.package'
    >;
    service: Attribute.Relation<
      'api::admin-inquiry.admin-inquiry',
      'oneToOne',
      'api::service.service'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::admin-inquiry.admin-inquiry',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::admin-inquiry.admin-inquiry',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAppointmentAppointment extends Schema.CollectionType {
  collectionName: 'appointments';
  info: {
    singularName: 'appointment';
    pluralName: 'appointments';
    displayName: 'Appointment';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    phone: Attribute.String & Attribute.Required;
    email: Attribute.Email & Attribute.Required;
    expectation: Attribute.Text & Attribute.Required;
    appointment_date: Attribute.DateTime & Attribute.Required;
    guide: Attribute.Relation<
      'api::appointment.appointment',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    package: Attribute.Relation<
      'api::appointment.appointment',
      'oneToOne',
      'api::package.package'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::appointment.appointment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::appointment.appointment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogBlog extends Schema.CollectionType {
  collectionName: 'blogs';
  info: {
    singularName: 'blog';
    pluralName: 'blogs';
    displayName: 'Blog';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    thumbnail: Attribute.Media<'images'>;
    description: Attribute.RichText & Attribute.Required;
    blog_categories: Attribute.Relation<
      'api::blog.blog',
      'manyToMany',
      'api::blog-category.blog-category'
    >;
    slug: Attribute.UID<'api::blog.blog', 'title'> & Attribute.Required;
    author_name: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'admin'>;
    author_image: Attribute.Media<'images'>;
    blog_tags: Attribute.Relation<
      'api::blog.blog',
      'manyToMany',
      'api::blog-tag.blog-tag'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiBlogCategoryBlogCategory extends Schema.CollectionType {
  collectionName: 'blog_categories';
  info: {
    singularName: 'blog-category';
    pluralName: 'blog-categories';
    displayName: 'Blog Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    blogs: Attribute.Relation<
      'api::blog-category.blog-category',
      'manyToMany',
      'api::blog.blog'
    >;
    icon: Attribute.String & Attribute.CustomField<'plugin::react-icons.icon'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-category.blog-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-category.blog-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogTagBlogTag extends Schema.CollectionType {
  collectionName: 'blog_tags';
  info: {
    singularName: 'blog-tag';
    pluralName: 'blog-tags';
    displayName: 'Blog Tag';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    blogs: Attribute.Relation<
      'api::blog-tag.blog-tag',
      'manyToMany',
      'api::blog.blog'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-tag.blog-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-tag.blog-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCalendarCalendar extends Schema.CollectionType {
  collectionName: 'calendars';
  info: {
    singularName: 'calendar';
    pluralName: 'calendars';
    displayName: 'Calendar';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    start_date: Attribute.DateTime &
      Attribute.Required &
      Attribute.DefaultTo<'2024-11-19T04:15:59.601Z'>;
    end_date: Attribute.DateTime &
      Attribute.Required &
      Attribute.DefaultTo<'2024-11-19T11:15:18.460Z'>;
    is_available: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    guides: Attribute.Relation<
      'api::calendar.calendar',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    heading: Attribute.String;
    notes: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::calendar.calendar',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::calendar.calendar',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactUsContactUs extends Schema.CollectionType {
  collectionName: 'contact_uses';
  info: {
    singularName: 'contact-us';
    pluralName: 'contact-uses';
    displayName: 'Contact Us';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    email: Attribute.Email;
    message: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-us.contact-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact-us.contact-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCouponCoupon extends Schema.CollectionType {
  collectionName: 'coupons';
  info: {
    singularName: 'coupon';
    pluralName: 'coupons';
    displayName: 'Coupon';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 4;
        maxLength: 15;
      }>;
    percentage: Attribute.Integer & Attribute.Required;
    products: Attribute.Relation<
      'api::coupon.coupon',
      'oneToMany',
      'api::shop.shop'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::coupon.coupon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::coupon.coupon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomePageHomePage extends Schema.SingleType {
  collectionName: 'home_pages';
  info: {
    singularName: 'home-page';
    pluralName: 'home-pages';
    displayName: 'Home Page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    testimonials: Attribute.Component<'home-testimonials.testimonials', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::home-page.home-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::home-page.home-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIconIcon extends Schema.CollectionType {
  collectionName: 'icons';
  info: {
    singularName: 'icon';
    pluralName: 'icons';
    displayName: 'Icon';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    icon: Attribute.Media<'images' | 'files'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::icon.icon', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::icon.icon', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiInquiryInquiry extends Schema.CollectionType {
  collectionName: 'inquiries';
  info: {
    singularName: 'inquiry';
    pluralName: 'inquiries';
    displayName: 'Inquiry';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    phone: Attribute.String & Attribute.Required;
    email: Attribute.Email & Attribute.Required;
    subject: Attribute.String & Attribute.Required;
    message: Attribute.Text & Attribute.Required;
    guide: Attribute.Relation<
      'api::inquiry.inquiry',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    package: Attribute.Relation<
      'api::inquiry.inquiry',
      'oneToOne',
      'api::package.package'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::inquiry.inquiry',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::inquiry.inquiry',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPackagePackage extends Schema.CollectionType {
  collectionName: 'packages';
  info: {
    singularName: 'package';
    pluralName: 'packages';
    displayName: 'Package';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    package_types: Attribute.Relation<
      'api::package.package',
      'manyToMany',
      'api::package-type.package-type'
    >;
    tags: Attribute.Relation<
      'api::package.package',
      'manyToMany',
      'api::tag.tag'
    >;
    image: Attribute.Media<'images', true>;
    brief_description: Attribute.Text & Attribute.Required;
    long_description: Attribute.Blocks;
    package_name: Attribute.String & Attribute.Required;
    package_tags: Attribute.Relation<
      'api::package.package',
      'manyToMany',
      'api::package-tag.package-tag'
    >;
    tailor_tags: Attribute.Relation<
      'api::package.package',
      'manyToMany',
      'api::tailor-tag.tailor-tag'
    >;
    sponsor_host: Attribute.Component<'package-sponsor-host.sponsor-host'>;
    adventure_specification: Attribute.Component<'package-adventure-specifications.adventure-specifications'>;
    package_categories: Attribute.Relation<
      'api::package.package',
      'manyToMany',
      'api::package-category.package-category'
    >;
    itinerary: Attribute.Component<'package-itinerary.itinerary'>;
    adventure_customization: Attribute.Component<'package-adventure-customization.adventure-customization'>;
    logistics: Attribute.Component<'package-logistics.logistics'>;
    accommodation: Attribute.Component<'package-accommodation.accommodation'>;
    cost_and_budgeting: Attribute.Component<
      'package-cost-and-budgeting.cost-and-budgeting',
      true
    >;
    faq: Attribute.Component<'faq.faq', true>;
    package_host: Attribute.Component<'package-host.package-host'>;
    hosted_by: Attribute.Component<'package-hosted-by.hosted-by'>;
    trip_facts: Attribute.Component<'package-trip-facts.trip-facts', true>;
    offer: Attribute.Component<'package-trip-offer.what-we-offfer', true>;
    visuals: Attribute.Component<'package-visuals.maps-and-visuals', true>;
    things_to_know: Attribute.Component<
      'package-things-to-know.things-to-know',
      true
    >;
    video: Attribute.String;
    parent_title: Attribute.String;
    package_country: Attribute.Relation<
      'api::package.package',
      'oneToOne',
      'api::package-country.package-country'
    >;
    package_region: Attribute.Relation<
      'api::package.package',
      'oneToOne',
      'api::package-region.package-region'
    >;
    climbers_booked: Attribute.Relation<
      'api::package.package',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    users: Attribute.Relation<
      'api::package.package',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    project: Attribute.Relation<
      'api::package.package',
      'oneToOne',
      'api::project.project'
    >;
    quote: Attribute.Relation<
      'api::package.package',
      'oneToOne',
      'api::quote.quote'
    >;
    inquiry: Attribute.Relation<
      'api::package.package',
      'oneToOne',
      'api::inquiry.inquiry'
    >;
    appointment: Attribute.Relation<
      'api::package.package',
      'oneToOne',
      'api::appointment.appointment'
    >;
    admin_appointment: Attribute.Relation<
      'api::package.package',
      'oneToOne',
      'api::admin-appointment.admin-appointment'
    >;
    is_popular: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::package.package',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::package.package',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPackageCategoryPackageCategory
  extends Schema.CollectionType {
  collectionName: 'package_categories';
  info: {
    singularName: 'package-category';
    pluralName: 'package-categories';
    displayName: 'Package Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    packages: Attribute.Relation<
      'api::package-category.package-category',
      'manyToMany',
      'api::package.package'
    >;
    image: Attribute.Media<'images' | 'files'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::package-category.package-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::package-category.package-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPackageCountryPackageCountry extends Schema.CollectionType {
  collectionName: 'package_countries';
  info: {
    singularName: 'package-country';
    pluralName: 'package-countries';
    displayName: 'Package Country';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    package: Attribute.Relation<
      'api::package-country.package-country',
      'oneToOne',
      'api::package.package'
    >;
    package_regions: Attribute.Relation<
      'api::package-country.package-country',
      'oneToMany',
      'api::package-region.package-region'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::package-country.package-country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::package-country.package-country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPackageCustomizationPackageCustomization
  extends Schema.CollectionType {
  collectionName: 'package_customizations';
  info: {
    singularName: 'package-customization';
    pluralName: 'package-customizations';
    displayName: 'Package Customization';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    addons: Attribute.Component<
      'package-customization.package-customization',
      true
    >;
    cultural_experience: Attribute.Component<
      'package-customization.package-customization',
      true
    >;
    adventure_activity: Attribute.Component<
      'package-customization.package-customization',
      true
    >;
    transportation: Attribute.Component<
      'package-customization.package-customization',
      true
    >;
    packages: Attribute.Relation<
      'api::package-customization.package-customization',
      'oneToMany',
      'api::package.package'
    >;
    name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::package-customization.package-customization',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::package-customization.package-customization',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPackageRegionPackageRegion extends Schema.CollectionType {
  collectionName: 'package_regions';
  info: {
    singularName: 'package-region';
    pluralName: 'package-regions';
    displayName: 'Package Region';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    package_country: Attribute.Relation<
      'api::package-region.package-region',
      'manyToOne',
      'api::package-country.package-country'
    >;
    package: Attribute.Relation<
      'api::package-region.package-region',
      'oneToOne',
      'api::package.package'
    >;
    image: Attribute.Media<'images'>;
    is_popular: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::package-region.package-region',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::package-region.package-region',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPackageTagPackageTag extends Schema.CollectionType {
  collectionName: 'package_tags';
  info: {
    singularName: 'package-tag';
    pluralName: 'package-tags';
    displayName: 'Package Tag';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    packages: Attribute.Relation<
      'api::package-tag.package-tag',
      'manyToMany',
      'api::package.package'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::package-tag.package-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::package-tag.package-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPackageTypePackageType extends Schema.CollectionType {
  collectionName: 'package_types';
  info: {
    singularName: 'package-type';
    pluralName: 'package-types';
    displayName: 'Package Type';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    packages: Attribute.Relation<
      'api::package-type.package-type',
      'manyToMany',
      'api::package.package'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::package-type.package-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::package-type.package-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPlanWithPlanWith extends Schema.SingleType {
  collectionName: 'plan_withs';
  info: {
    singularName: 'plan-with';
    pluralName: 'plan-withs';
    displayName: 'Plan With';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    steps: Attribute.Component<'steps.steps', true>;
    flags: Attribute.Component<'flag.flags', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::plan-with.plan-with',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::plan-with.plan-with',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPlanWithUsPlanWithUs extends Schema.CollectionType {
  collectionName: 'plan_with_uses';
  info: {
    singularName: 'plan-with-us';
    pluralName: 'plan-with-uses';
    displayName: 'Plan with us';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    group: Attribute.Enumeration<['solo', 'group', 'not sure']> &
      Attribute.Required &
      Attribute.DefaultTo<'solo'>;
    travel_dates: Attribute.Component<'planwithus-travel-dates.travel-dates'>;
    destination_country: Attribute.Relation<
      'api::plan-with-us.plan-with-us',
      'oneToOne',
      'api::package-country.package-country'
    >;
    grade: Attribute.Enumeration<['beginner', 'intermediate', 'advanced']> &
      Attribute.Required &
      Attribute.DefaultTo<'beginner'>;
    packages: Attribute.Relation<
      'api::plan-with-us.plan-with-us',
      'oneToMany',
      'api::package.package'
    >;
    budget: Attribute.Component<'planwithus-budget.budget'>;
    accommodation_preferences: Attribute.Text;
    customized_experience: Attribute.String;
    finalize: Attribute.Component<'planwithus-review-finalize.review-and-f-inalize'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::plan-with-us.plan-with-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::plan-with-us.plan-with-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductOrderProductOrder extends Schema.CollectionType {
  collectionName: 'product_orders';
  info: {
    singularName: 'product-order';
    pluralName: 'product-orders';
    displayName: 'Product Order';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    products: Attribute.Relation<
      'api::product-order.product-order',
      'manyToMany',
      'api::shop.shop'
    >;
    user: Attribute.Relation<
      'api::product-order.product-order',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    is_rented: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    rent_description: Attribute.Text;
    quantity: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product-order.product-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product-order.product-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectProject extends Schema.CollectionType {
  collectionName: 'projects';
  info: {
    singularName: 'project';
    pluralName: 'projects';
    displayName: 'Project';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    date: Attribute.Date & Attribute.Required;
    image: Attribute.Media<'images', true>;
    about_work: Attribute.Blocks;
    project_link: Attribute.String;
    guides: Attribute.Relation<
      'api::project.project',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    package: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'api::package.package'
    >;
    users: Attribute.Relation<
      'api::project.project',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    user_review: Attribute.Component<'user-review.user-review', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiQuoteQuote extends Schema.CollectionType {
  collectionName: 'quotes';
  info: {
    singularName: 'quote';
    pluralName: 'quotes';
    displayName: 'Quote';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    phone: Attribute.String & Attribute.Required;
    email: Attribute.Email & Attribute.Required;
    subject: Attribute.String & Attribute.Required;
    message: Attribute.Text & Attribute.Required;
    service: Attribute.Relation<
      'api::quote.quote',
      'oneToOne',
      'api::service.service'
    >;
    package: Attribute.Relation<
      'api::quote.quote',
      'oneToOne',
      'api::package.package'
    >;
    guide: Attribute.Relation<
      'api::quote.quote',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::quote.quote',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::quote.quote',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiServiceService extends Schema.CollectionType {
  collectionName: 'services';
  info: {
    singularName: 'service';
    pluralName: 'services';
    displayName: 'Service';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    image: Attribute.Media<'images'>;
    categories: Attribute.Relation<
      'api::service.service',
      'manyToMany',
      'api::service-category.service-category'
    >;
    associated_packages: Attribute.Relation<
      'api::service.service',
      'oneToMany',
      'api::package.package'
    >;
    icon: Attribute.String & Attribute.CustomField<'plugin::react-icons.icon'>;
    service_charge: Attribute.BigInteger &
      Attribute.Required &
      Attribute.DefaultTo<'0'>;
    booking_charge: Attribute.BigInteger &
      Attribute.Required &
      Attribute.DefaultTo<'0'>;
    service_provider: Attribute.Relation<
      'api::service.service',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    quote: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'api::quote.quote'
    >;
    admin_appointment: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'api::admin-appointment.admin-appointment'
    >;
    service_request: Attribute.Relation<
      'api::service.service',
      'manyToOne',
      'api::service-request.service-request'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiServiceCategoryServiceCategory
  extends Schema.CollectionType {
  collectionName: 'service_categories';
  info: {
    singularName: 'service-category';
    pluralName: 'service-categories';
    displayName: 'Service Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    services: Attribute.Relation<
      'api::service-category.service-category',
      'manyToMany',
      'api::service.service'
    >;
    image: Attribute.Media<'images'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service-category.service-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::service-category.service-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiServiceRequestServiceRequest extends Schema.CollectionType {
  collectionName: 'service_requests';
  info: {
    singularName: 'service-request';
    pluralName: 'service-requests';
    displayName: 'Service Request';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    services: Attribute.Relation<
      'api::service-request.service-request',
      'oneToMany',
      'api::service.service'
    >;
    users_permissions_users: Attribute.Relation<
      'api::service-request.service-request',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service-request.service-request',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::service-request.service-request',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiShopShop extends Schema.CollectionType {
  collectionName: 'shops';
  info: {
    singularName: 'shop';
    pluralName: 'shops';
    displayName: 'Product';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    price: Attribute.Integer;
    shop_categories: Attribute.Relation<
      'api::shop.shop',
      'manyToMany',
      'api::shop-category.shop-category'
    >;
    image: Attribute.Media<'images', true>;
    description: Attribute.RichText;
    charge: Attribute.Integer & Attribute.DefaultTo<0>;
    colors: Attribute.Component<'color.shop-color', true>;
    rent_available: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    rent_price: Attribute.BigInteger;
    shop_sub_categories: Attribute.Relation<
      'api::shop.shop',
      'manyToMany',
      'api::shop-sub-category.shop-sub-category'
    >;
    discount_rate: Attribute.Integer;
    stock_count: Attribute.BigInteger &
      Attribute.Required &
      Attribute.DefaultTo<'1'>;
    slug: Attribute.UID<'api::shop.shop', 'name'> & Attribute.Required;
    terms_and_condition: Attribute.Blocks;
    rental_detail: Attribute.Blocks;
    coupon: Attribute.Relation<
      'api::shop.shop',
      'manyToOne',
      'api::coupon.coupon'
    >;
    product_orders: Attribute.Relation<
      'api::shop.shop',
      'manyToMany',
      'api::product-order.product-order'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::shop.shop', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::shop.shop', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiShopCategoryShopCategory extends Schema.CollectionType {
  collectionName: 'shop_categories';
  info: {
    singularName: 'shop-category';
    pluralName: 'shop-categories';
    displayName: 'Shop Category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    icon: Attribute.String & Attribute.CustomField<'plugin::react-icons.icon'>;
    shops: Attribute.Relation<
      'api::shop-category.shop-category',
      'manyToMany',
      'api::shop.shop'
    >;
    shop_sub_categories: Attribute.Relation<
      'api::shop-category.shop-category',
      'manyToMany',
      'api::shop-sub-category.shop-sub-category'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::shop-category.shop-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::shop-category.shop-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiShopSubCategoryShopSubCategory
  extends Schema.CollectionType {
  collectionName: 'shop_sub_categories';
  info: {
    singularName: 'shop-sub-category';
    pluralName: 'shop-sub-categories';
    displayName: 'Shop SubCategory';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    shop_categories: Attribute.Relation<
      'api::shop-sub-category.shop-sub-category',
      'manyToMany',
      'api::shop-category.shop-category'
    >;
    shops: Attribute.Relation<
      'api::shop-sub-category.shop-sub-category',
      'manyToMany',
      'api::shop.shop'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::shop-sub-category.shop-sub-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::shop-sub-category.shop-sub-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTagTag extends Schema.CollectionType {
  collectionName: 'tags';
  info: {
    singularName: 'tag';
    pluralName: 'tags';
    displayName: 'Tag';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    packages: Attribute.Relation<
      'api::tag.tag',
      'manyToMany',
      'api::package.package'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiTailorTagTailorTag extends Schema.CollectionType {
  collectionName: 'tailor_tags';
  info: {
    singularName: 'tailor-tag';
    pluralName: 'tailor-tags';
    displayName: 'Tailor Tag';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    packages: Attribute.Relation<
      'api::tailor-tag.tailor-tag',
      'manyToMany',
      'api::package.package'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tailor-tag.tailor-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tailor-tag.tailor-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTeamTeam extends Schema.CollectionType {
  collectionName: 'teams';
  info: {
    singularName: 'team';
    pluralName: 'teams';
    displayName: 'Team';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    member: Attribute.Relation<
      'api::team.team',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    designation: Attribute.String;
    thumbnail: Attribute.Media<'images'>;
    team_categories: Attribute.Relation<
      'api::team.team',
      'manyToMany',
      'api::team-category.team-category'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::team.team', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::team.team', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiTeamCategoryTeamCategory extends Schema.CollectionType {
  collectionName: 'team_categories';
  info: {
    singularName: 'team-category';
    pluralName: 'team-categories';
    displayName: 'Team Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    team_members: Attribute.Relation<
      'api::team-category.team-category',
      'manyToMany',
      'api::team.team'
    >;
    name: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::team-category.team-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::team-category.team-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWorkWork extends Schema.CollectionType {
  collectionName: 'works';
  info: {
    singularName: 'work';
    pluralName: 'works';
    displayName: 'Work';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    date: Attribute.Date;
    image: Attribute.Media<'images', true>;
    description: Attribute.RichText;
    link: Attribute.String;
    user_works: Attribute.Relation<
      'api::work.work',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::work.work', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::work.work', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::react-icons.iconlibrary': PluginReactIconsIconlibrary;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::about-us.about-us': ApiAboutUsAboutUs;
      'api::accommodation-preference.accommodation-preference': ApiAccommodationPreferenceAccommodationPreference;
      'api::admin-appointment.admin-appointment': ApiAdminAppointmentAdminAppointment;
      'api::admin-inquiry.admin-inquiry': ApiAdminInquiryAdminInquiry;
      'api::appointment.appointment': ApiAppointmentAppointment;
      'api::blog.blog': ApiBlogBlog;
      'api::blog-category.blog-category': ApiBlogCategoryBlogCategory;
      'api::blog-tag.blog-tag': ApiBlogTagBlogTag;
      'api::calendar.calendar': ApiCalendarCalendar;
      'api::contact-us.contact-us': ApiContactUsContactUs;
      'api::coupon.coupon': ApiCouponCoupon;
      'api::home-page.home-page': ApiHomePageHomePage;
      'api::icon.icon': ApiIconIcon;
      'api::inquiry.inquiry': ApiInquiryInquiry;
      'api::package.package': ApiPackagePackage;
      'api::package-category.package-category': ApiPackageCategoryPackageCategory;
      'api::package-country.package-country': ApiPackageCountryPackageCountry;
      'api::package-customization.package-customization': ApiPackageCustomizationPackageCustomization;
      'api::package-region.package-region': ApiPackageRegionPackageRegion;
      'api::package-tag.package-tag': ApiPackageTagPackageTag;
      'api::package-type.package-type': ApiPackageTypePackageType;
      'api::plan-with.plan-with': ApiPlanWithPlanWith;
      'api::plan-with-us.plan-with-us': ApiPlanWithUsPlanWithUs;
      'api::product-order.product-order': ApiProductOrderProductOrder;
      'api::project.project': ApiProjectProject;
      'api::quote.quote': ApiQuoteQuote;
      'api::service.service': ApiServiceService;
      'api::service-category.service-category': ApiServiceCategoryServiceCategory;
      'api::service-request.service-request': ApiServiceRequestServiceRequest;
      'api::shop.shop': ApiShopShop;
      'api::shop-category.shop-category': ApiShopCategoryShopCategory;
      'api::shop-sub-category.shop-sub-category': ApiShopSubCategoryShopSubCategory;
      'api::tag.tag': ApiTagTag;
      'api::tailor-tag.tailor-tag': ApiTailorTagTailorTag;
      'api::team.team': ApiTeamTeam;
      'api::team-category.team-category': ApiTeamCategoryTeamCategory;
      'api::work.work': ApiWorkWork;
    }
  }
}
