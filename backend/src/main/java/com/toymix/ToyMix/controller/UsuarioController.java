package com.toymix.ToyMix.controller;

import com.toymix.ToyMix.dto.UsuarioDTO;
import com.toymix.ToyMix.model.entity.Usuario;
import com.toymix.ToyMix.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> listarTodosUsuarios() {
        return usuarioService.listarTodosUsuarios();
    }

    @PostMapping
    public ResponseEntity<UsuarioDTO> salvar(@RequestBody UsuarioDTO usuarioDTO) {
        Usuario usuario = usuarioService.salvarCadastro(usuarioDTO);
        return ResponseEntity.ok(usuarioDTO);
    }

    @PutMapping("/{id_usuario}")
    public ResponseEntity<Usuario> atualizar(@PathVariable int id_usuario, @RequestBody UsuarioDTO usuarioDTO) {
        return usuarioService.atualizarCadastro(id_usuario, usuarioDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id_usuario}")
    public ResponseEntity<Usuario> excluir(@PathVariable int id_usuario) {
        usuarioService.excluirCadastro(id_usuario);
        return ResponseEntity.noContent().build();
    }

}
