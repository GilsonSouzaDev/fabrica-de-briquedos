package com.toymix.ToyMix.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UniqueCodigoValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueCodigo {
    String message() default "Código já existe!";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
