# Estágio de Build usando Maven e JDK 17
FROM maven:3.9.6-eclipse-temurin-17-focal AS build
WORKDIR /app
# Copia apenas o pom.xml primeiro para baixar as dependências (cache)
COPY pom.xml .
RUN mvn dependency:go-offline -B
# Copia o código-fonte e compila
COPY src ./src
RUN mvn clean package -DskipTests

# Estágio de Execução usando uma imagem mais leve
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
# Copia o JAR compilado do estágio de build
COPY --from=build /app/target/*.jar /app/spring-app.jar

# Define as variáveis de ambiente base (serão sobrescritas no docker-compose)
ENV SPRING_PROFILES_ACTIVE=supabase

ENTRYPOINT ["java", "-jar", "spring-app.jar"]
