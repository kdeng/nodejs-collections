// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,

    /**
     * OIDC Provider
     */
    oidc_provider: "https://my.local.stuff.co.nz:8443/stuff-ssp-web/",

    /**
     * Client ID
     */
    client_id: "7e55c5c0-3450-4964-a1e5-f2f956a4e9b0",


    /**
     * Client Secret
     */
    client_secret: "AM2ScWr-3ABkEss4QkkCzSJeHi2yDuXaY1MnhfvTjYkRwEWdjv6D9H8UfYCIsoK9rkIb3UaeME5cQx4bhf3AfoA"
};
