FROM public.ecr.aws/lambda/nodejs:14

COPY index.js ${LAMBDA_TASK_ROOT}

RUN npm install aws-sdk

CMD [ "index.handler" ]