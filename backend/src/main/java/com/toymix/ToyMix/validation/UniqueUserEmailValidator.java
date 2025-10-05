package com.toymix.ToyMix.validation;

import com.toymix.ToyMix.repository.UsuarioRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UniqueUserEmailValidator implements ConstraintValidator<UniqueUserEmail, String> {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public boolean isValid(String userEmail, ConstraintValidatorContext context) {
        if (userEmail == null || userEmail.isBlank()) {
            return true; // @NotBlank fará a validação obrigatória
        }
        return !usuarioRepository.existsByUserEmail(userEmail);
    }
}
