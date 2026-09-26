# Reading Radar deployment policy

## Hard rule

**No iterative development work may deploy directly to Netlify production.**

All normal changes must be made on the `development` branch and reviewed/tested in a Netlify Deploy Preview before any production release.

## Branches

- `main` — production only
- `development` — active development and preview testing

## Production release gate

A production deploy is allowed only when all of the following are true:

1. The change set is complete and intentionally batched.
2. The development preview has been reviewed.
3. Netlify credit usage has been checked against the current billing cycle.
4. The projected production-deploy cost is acceptable.
5. Production deployment is explicitly approved.

## Netlify cost-control rule

- Prefer Deploy Previews for testing and iteration.
- Do not trigger direct/manual production deploys during ordinary development.
- Avoid repeated production deploys for small fixes.
- Batch changes into a single production release wherever practical.
- If Netlify usage reaches 50%, flag it.
- At 75%+, enter conservation mode.
- At 90%+, treat further metered production activity as critical unless explicitly approved.

## Incident note

On 18 September 2026, eight production deploys consumed 120 Netlify credits in one day. This policy exists to prevent a recurrence.


## Repository-enforced Netlify safety gate

The repository contains `netlify-production-gate.js` and `netlify.toml`.

For the production deploy context, Netlify's ignore command blocks the build by default. A production build is permitted only when the latest commit message contains the exact token:

`[deploy production]`

This means ordinary commits, automated edits, and iterative changes cannot consume a production-deploy charge simply by reaching `main`.

Deploy Previews and branch deploys are explicitly left enabled by the file-based configuration so development/testing can use non-production deploy contexts.

### Release procedure

1. Work on `development`.
2. Review the Deploy Preview.
3. Check the current Netlify credit balance.
4. Batch all approved changes.
5. Merge/release deliberately.
6. Only the explicit release commit may contain `[deploy production]`.
