package com.toymix.ToyMix.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UniqueDescricaoValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueDescricao {
    String message() default "Já existe um brinquedo com esta descrição.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

