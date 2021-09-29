FROM registry.digitalservice.id/proxyjds/library/alpine:edge

RUN apk add nodejs yarn && rm -rf /var/cache/apk/*

WORKDIR /app

COPY package.json ./

ENV PORT 3003
ENV NODE_ENV production

RUN yarn install

COPY . .

RUN yarn run build

RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

USER pptruser

EXPOSE ${PORT}

RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]