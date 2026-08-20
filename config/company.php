<?php

return [
    'company_name' => env('COMPANY_NAME', 'CARING AND SUPPORTIVE SERVICE LTD'),
    'name' => env('COMPANY_NAME', 'CARING AND SUPPORTIVE SERVICE LTD'),

    'company_number' => env('COMPANY_NUMBER', '16120199'),
    'tax_id' => env('COMPANY_TAX_ID', '16120199'),

    'registered_office_address' => env('COMPANY_ADDRESS', '58 Mund St, London, United Kingdom, W14 9LZ'),
    'address' => env('COMPANY_ADDRESS', '58 Mund St, London, United Kingdom, W14 9LZ'),

    'email' => env('COMPANY_EMAIL', env('MAIL_FROM_ADDRESS', 'support@caringandsupportive.co.uk')),
    'phone' => env('COMPANY_PHONE', '+44 20 7946 0912'),
];
