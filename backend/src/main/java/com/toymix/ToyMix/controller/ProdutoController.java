package com.toymix.ToyMix.controller;

import com.toymix.ToyMix.dto.ProdutoDTO;
import com.toymix.ToyMix.model.entity.Produto;
import com.toymix.ToyMix.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping("/")
    public List<Produto> ExibirTodosProdutos() {
        return produtoService.listarTodosProdutos();
    }

    @PostMapping
    public ResponseEntity<Produto> salvar(@RequestBody ProdutoDTO produtoDTO) {
        Produto produto = produtoService.cadastrarProduto(produtoDTO);
        return ResponseEntity.ok(produto);
    }

    @PutMapping("/{id_produto}")
    public ResponseEntity<Produto> atualizar(@PathVariable int id_produto, @RequestBody ProdutoDTO produtoDTO) {
        return produtoService.atualizarProduto(id_produto, produtoDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id_produto}")
    public ResponseEntity<Produto> excluir(@PathVariable int id_produto) {
        produtoService.excluirProduto(id_produto);
        return ResponseEntity.noContent().build();
    }

}
