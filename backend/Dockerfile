# Use uma imagem base do Java. Recomendo especificar a versão.
FROM openjdk:17-jdk-slim

# Diretório de trabalho dentro do container
WORKDIR /app

# O nome do arquivo .jar DEVE CORRESPONDER ao que foi gerado pelo Maven
COPY target/ToyMix-0.0.1-SNAPSHOT.jar /app/spring-app.jar

# Ponto de entrada para executar a aplicação
ENTRYPOINT ["java", "-jar", "spring-app.jar"]
