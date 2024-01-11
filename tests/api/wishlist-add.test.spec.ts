import { APIResponse, expect, test } from '@playwright/test';
import { api, url, body, params } from '../../data/api/add-to-wishlist-endpoint.json';
import * as addToWishlistSchema from '../../data/api/add-to-wishlist.schema.json';
import Ajv from 'ajv';

test.describe('API: Wishlist Adding Endpoint', async () => {
  let response: APIResponse;

  test.beforeEach(async ({ request }) => {
    response = await request.post(url.addToWishlist, {
      headers: {
        Authorization: `Bearer ${api.accesToken}`,
      },
      data: body,
      params: params,
    });
  });

  test(`POST ${url.addToWishlist} should return 200`, async () => {
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test(`POST ${url.addToWishlist} responce schema should be valid`, async () => {
    const responseBody = await response.json();
    const schemaValidator = new Ajv();
    const isSchemaValid = schemaValidator.validate(addToWishlistSchema, responseBody);
    expect(isSchemaValid).toBe(true);
    if (!isSchemaValid) {
      console.error('AJV Validation Errors:', schemaValidator.errorsText());
    }
  });
});
