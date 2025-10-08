package com.toymix.ToyMix.validation;

import com.toymix.ToyMix.dto.BrinquedoDTO;
import com.toymix.ToyMix.model.entity.Brinquedo;
import com.toymix.ToyMix.repository.BrinquedoRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.Optional;

@Component
public class UniqueCodigoValidator implements ConstraintValidator<UniqueCodigo, BrinquedoDTO> {

    @Autowired
    private BrinquedoRepository brinquedoRepository;

    @Override
    public boolean isValid(BrinquedoDTO dto, ConstraintValidatorContext context) {
        if (dto == null || dto.getCodigo() == 0) return true;

        Optional<Brinquedo> existente = brinquedoRepository.findAll().stream()
                .filter(b -> b.getCodigo() == dto.getCodigo())
                .findFirst();

        // Se não existe nenhum com esse código, é válido
        if (existente.isEmpty()) return true;

        // Se existe, mas é o mesmo brinquedo (mesmo ID), é válido
        return dto.getId() != null && existente.get().getId().equals(dto.getId());
    }
}

