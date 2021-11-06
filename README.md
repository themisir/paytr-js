# PAYTR - Node.js Integration

Simple javascript integration API for [paytr](https://www.paytr.com/) payment
gateway with TypeScript typings.

# Getting started

1. Install paytr package into your project using `npm` or `yarn` and import it

```ts
import { PayTRClient } from 'paytr';
```

2. Create paytr payment client using your merchant parameters

```ts
const paytr = new PayTRClient({
  merchant_id:     '000000',
  merchant_key:    'key provided by paytr',
  merchant_salt:   'salt provided by paytr',
  debug_on:        true,
  no_installment:  true,
  max_installment: 0,
  timeout_limit:   0,
  test_mode:       false,
});
```

Please check documentation provided by PayTR for detailed information about the
following parameters.

3. Create payment token

```ts
const response = await paytr.getToken({
  merchant_oid:   'unique id',
  payment_amount: 10.99,
  currency:       'TRY',
  email:          'user@domain.tld',
  user_ip:        '127.0.0.1',
  user_name:      'John Doe',
  user_phone:     '+123456789',
  user_address:   'customer billing address',
  user_basket:    [
    {
      name:    'Product name',
      price:   '10.99',
      quantity: 1,
    }
  ],
  merchant_ok_url:   'https://example.local/success',
  merchant_fail_url: 'https://example.local/fail',
});
```

4. Render payment iframe using generated token or redirect user to that URL

```ts
const paytrUrl = 'https://www.paytr.com/odeme/guvenli/' + response.token;
```

# Notice

_This package is not affiliated with "PayTR Ödeme ve Elektronik Para Kuruluşu A.Ş"
in any way._