# koa_service


docker build -t $REGION-docker.pkg.dev/${PROJECT_ID}/hello-repo/hello-app:v1 .

gcloud auth configure-docker REGION-docker.pkg.dev

docker push $REGION-docker.pkg.dev/${PROJECT_ID}/hello-repo/hello-app:v1

docker run --rm -p 8080:8080 $REGION-docker.pkg.dev/${PROJECT_ID}/hello-repo/hello-app:v1


docker build -t test_koa .

docker run --rm -p 8080:8080 test_koa