#!/usr/bin/env bash

if [ "${1}" == "deploy" ]; then
    docker push "uumpa/knesset-data-backend:latest" &&\
    docker push "uumpa/knesset-data-backend:${TRAVIS_COMMIT}" &&\
    travis_ci_operator.sh github-yaml-update \
        hasadna-k8s master values.auto-updated.yaml '{"oknesset":{"DataBackendImage": "uumpa/knesset-data-backend:'${TRAVIS_COMMIT}'"}}' \
        "automatic update of knesset-data-backend" hasadna/hasadna-k8s &&\
    echo &&\
    echo Great Success &&\
    echo &&\
    echo uumpa/knesset-data-backend:latest &&\
    echo uumpa/knesset-data-backend:${TRAVIS_COMMIT}
fi
