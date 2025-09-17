package com.toymix.ToyMix.repository;

import com.toymix.ToyMix.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository <Usuario, Integer>{
    Optional<Usuario> findByNome(String nome);

}
