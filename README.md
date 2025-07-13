# Portfolio Website

This repository contains my personal portfolio website deployed on Google Cloud Platform using Cloud Storage + Load Balancer for the most cost-effective hosting solution with custom domain support.

## Quick Setup

1. Install [Google Cloud CLI](https://cloud.google.com/sdk/docs/install)

2. Login to [Google Cloud](https://console.cloud.google.com/) and set the current project :

   ```bash
   gcloud auth login
   gcloud config set project <your-project>
   ```

3. Upload new files and clear cache:

   ```bash
   gsutil cp index.html gs://<your-bucket-name>
   gcloud compute url-maps invalidate-cdn-cache <your-url-map> --path="/*"
   ```
