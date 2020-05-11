FROM node:latest

ENV DATABASE_HOST=db 
ENV NODE_ENV=development

ADD start.sh /start.sh
RUN chmod 755 /start.sh
CMD ["/start.sh"]