package com.toymix.ToyMix.controller;

import com.toymix.ToyMix.dto.BrinquedoDTO;
import com.toymix.ToyMix.model.entity.Brinquedo;
import com.toymix.ToyMix.service.BrinquedoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(
        origins = {
                "https://fabrica-de-briquedos.vercel.app",
                "http://localhost:4200",
                "http://localhost:8080"

        }
)
@RequestMapping("/brinquedo")
public class BrinquedoController {

    @Autowired
    private BrinquedoService brinquedoService;

    @GetMapping("/")
    public List<Brinquedo> listarBrinquedos() {
        return brinquedoService.listarTodosBrinquedos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Brinquedo> buscarBrinquedoPorId(@PathVariable Integer id) {
        return brinquedoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar/{nome}")
    public List<Brinquedo> buscarBrinquedoPorNome(@PathVariable String descricao) {
           return brinquedoService.buscarPorNome(descricao);
    }

    @PostMapping
    public ResponseEntity<Brinquedo> salvarCadastroDoBrinquedo(@Valid @RequestBody BrinquedoDTO brinquedoDTO){
        Brinquedo novoBrinquedo = brinquedoService.cadastrarBrinquedo(brinquedoDTO);
        return ResponseEntity.ok(novoBrinquedo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Brinquedo> atualizarCadastroDoBrinquedo(@PathVariable int id,@Valid @RequestBody BrinquedoDTO brinquedoDTO){
        return brinquedoService.atualizarCadastroDoBrinquedo(id, brinquedoDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirCadastroDoBrinquedo(@PathVariable int id){
        brinquedoService.excluirCadastroDoBrinquedo(id);
        return ResponseEntity.noContent().build();
    }
}