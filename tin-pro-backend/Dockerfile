FROM openjdk:17-jdk-slim

WORKDIR ./

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline

COPY src ./src
RUN mkdir ./frukhmara

EXPOSE 8080

CMD ["./mvnw", "spring-boot:run"]