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
public class UniqueDescricaoValidator implements ConstraintValidator<UniqueDescricao, BrinquedoDTO> {

    @Autowired
    private BrinquedoRepository brinquedoRepository;

    @Override
    public boolean isValid(BrinquedoDTO dto, ConstraintValidatorContext context) {
        if (dto == null || dto.getDescricao() == null || dto.getDescricao().isBlank()) return true;

        Optional<Brinquedo> existente = brinquedoRepository.findByDescricaoIgnoreCase(dto.getDescricao());

        if (existente.isEmpty()) return true;

        // Permite se for o mesmo ID
        return dto.getId() != null && existente.get().getId().equals(dto.getId());
    }
}

