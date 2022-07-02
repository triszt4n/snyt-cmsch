FROM eclipse-temurin:17-alpine
FROM node:16-alpine
MAINTAINER kir-dev@sch.bme.hu

ENV JAVA_HOME=/opt/java/openjdk
COPY --from=eclipse-temurin:17-alpine $JAVA_HOME $JAVA_HOME
ENV PATH="${JAVA_HOME}/bin:${PATH}"

COPY ./src ./src
COPY ./gradle ./gradle
COPY .env .
COPY gradlew .
COPY build.gradle.kts .
COPY settings.gradle.kts .

RUN ./gradlew clean build
COPY build/libs/cmsch.jar /opt/cmsch/
WORKDIR /opt/cmsch
ENTRYPOINT ["java", "-Dspring.profiles.include=docker", "-XX:+UnlockExperimentalVMOptions", "-XX:+UseContainerSupport", "-XX:+UseSerialGC", "-XX:MaxRAMPercentage=90", "-jar", "/opt/cmsch/cmsch.jar"]
EXPOSE 80
