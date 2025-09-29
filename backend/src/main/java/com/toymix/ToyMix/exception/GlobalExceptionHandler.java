package com.toymix.ToyMix.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 🔹 Captura erros de validação do Bean Validation (@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult()
                .getAllErrors()
                .stream()
                .map(error -> error.getDefaultMessage()) // pega a mensagem do @UniqueDescricao, @UniqueCodigo etc
                .findFirst()
                .orElse("Erro de validação");

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errorMessage);
    }

    // 🔹 Captura erros vindos do banco (unique constraint, foreign key, etc)
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleUniqueConstraint(DataIntegrityViolationException ex) {
        return ResponseEntity
                .badRequest()
                .body("Já existe um registro com este valor no banco de dados.");
    }
}
