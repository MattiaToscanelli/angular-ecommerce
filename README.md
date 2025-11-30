# 🛒 Angular eCommerce Web App

This is a frontend eCommerce application developed using Angular.  
The main objective was to explore and learn the framework, so the graphical design was kept simple.  
It communicates with a backend powered by **Spring Boot** (available in a separate repository).

---

## 🚀 How to Run Locally

To start the Angular eCommerce app locally:

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm start
   ```

3. Visit the app in your browser:
   ```
   https://localhost:4200
   ```

> Make sure to configure Okta, Stripe, and SSL if needed (see sections below).

---

## 🖥️ Backend Repository

The backend REST API is built with **Spring Boot** and is available here:  
🔗 [spring-boot-ecommerce](https://github.com/MattiaToscanelli/springboot-ecommerce)


Make sure to clone and run the backend repository as well to enable full functionality (product listing, checkout, etc).

---

## 🔐 Connect Okta to Angular

To enable authentication with **Okta**, follow these steps:

1. Open a command-prompt window.

2. Move into the Angular project directory:
   ```bash
   cd angular-ecommerce
   ```

3. Create a directory for your configuration file:
   ```bash
   mkdir config
   ```

4. Create the configuration file:
   ```bash
   touch my-app-config.ts
   ```

5. Add your Okta parameters to the file:

   ```ts
   export default {
       oidc: {
           clientId: '<client_id>',
           issuer: 'https://<issuer>/oauth2/default',
           redirectUri: 'https://localhost:4200/login/callback',
           scopes: ['openid', 'profile', 'email'],
       }
   }
   ```

---

## 🔒 Add OpenSSL to Angular (for HTTPS in local dev)

To generate a self-signed SSL certificate for local development:

1. Open a command-prompt window.

2. Navigate to your Angular project:
   ```bash
   cd angular-ecommerce
   ```

3. Create a directory for SSL files:
   ```bash
   mkdir ssl-localhost
   ```

4. Inside the project root, create a file named `localhost.conf`.

5. Add the following configuration (customize values as needed):

   ```ini
   [req]
   prompt = no
   distinguished_name = dn

   [dn]
   C = <country_code>
   ST = <state>
   L = <city>
   O = <department_name>
   OU = <group_name>
   CN = localhost
   ```

6. Save the file.

7. Run the following command from your project directory:
   ```bash
   openssl req -x509 -out ssl-localhost\localhost.crt -keyout ssl-localhost\localhost.key -newkey rsa:2048 -nodes -sha256 -days 365 -config localhost.conf
   ```

8. Verify that the `ssl-localhost` folder contains the following files:
   - `localhost.crt`
   - `localhost.key`

---

## 💳 Add Stripe to Angular

To enable Stripe integration for payment processing:

1. Open the file `src/environments/environment.development.ts`

2. Add your Stripe publishable key to the configuration:

   ```ts
   export const environment = {
       ecommerceApiUrl: 'https://localhost:8443/api',
       stripePublishableKey: '<stripe-publishable-key>',
   };
   ```

Make sure your backend (Spring Boot) is also configured with the corresponding secret key.

---
