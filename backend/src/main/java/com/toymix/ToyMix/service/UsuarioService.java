package com.toymix.ToyMix.service;

import com.toymix.ToyMix.dto.UsuarioDTO;
import com.toymix.ToyMix.model.entity.Usuario;
import com.toymix.ToyMix.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> listarTodosUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario salvarCadastro(UsuarioDTO usuarioDTO) {
        Usuario usuario = new Usuario();
        usuario.setNome(usuarioDTO.getNome());
        usuario.setUserEmail(usuarioDTO.getUserEmail());
        usuario.setUserSenha(usuarioDTO.getUserSenha());
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> atualizarCadastro(int id_usuario, UsuarioDTO usuarioDTO) {
        return usuarioRepository.findById(id_usuario).map(usuario -> {
            usuario.setNome(usuarioDTO.getNome());
            usuario.setUserEmail(usuarioDTO.getUserEmail());
            usuario.setUserSenha(usuarioDTO.getUserSenha());
            return usuarioRepository.save(usuario);
        });
    }

    public void excluirCadastro(int id_usuario) {
        usuarioRepository.deleteById(id_usuario);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByUserEmail(email);
    }


    // 🔹 Novo método de login
    public Optional<UsuarioDTO> login(String email, String senha) {
        return usuarioRepository.findByUserEmail(email)
                .filter(usuario -> usuario.getUserSenha().equals(senha)) // valida senha
                .map(usuario -> {
                    UsuarioDTO dto = new UsuarioDTO();
                    dto.setNome(usuario.getNome());
                    dto.setUserEmail(usuario.getUserEmail());
                    // não retorna senha
                    return dto;
                });
    }

}
