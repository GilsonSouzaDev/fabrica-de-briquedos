package com.toymix.ToyMix.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UniqueUserEmailValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueUserEmail {
    String message() default "Já existe um usuário com este e-mail.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

