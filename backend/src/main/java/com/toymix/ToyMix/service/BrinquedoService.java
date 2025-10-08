package com.toymix.ToyMix.service;

import com.toymix.ToyMix.dto.BrinquedoDTO;
import com.toymix.ToyMix.model.entity.Brinquedo;
import com.toymix.ToyMix.repository.BrinquedoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class BrinquedoService {

    @Autowired
    private BrinquedoRepository brinquedoRepository;

    public List<Brinquedo> listarTodosBrinquedos() {
        return brinquedoRepository.findAll();
    }

    public Optional<Brinquedo> buscarPorId(Integer id){
        return brinquedoRepository.findById(id);
    }

    public List<Brinquedo> buscarPorNome(String descricao){
        return brinquedoRepository.findByDescricaoContainsIgnoreCase(descricao);
    }

    public Brinquedo cadastrarBrinquedo(BrinquedoDTO brinquedoDTO){
        Brinquedo brinquedo = new Brinquedo();
        brinquedo.setCodigo(brinquedoDTO.getCodigo());
        brinquedo.setDescricao(brinquedoDTO.getDescricao());
        brinquedo.setCategoria(brinquedoDTO.getCategoria());
        brinquedo.setMarca(brinquedoDTO.getMarca());
        brinquedo.setImagem(brinquedoDTO.getImagem());
        brinquedo.setValor(brinquedoDTO.getValor());
        brinquedo.setDetalhes(brinquedoDTO.getDetalhes());
        brinquedo.setQuantVendas(brinquedoDTO.getQuantVendas());

        return brinquedoRepository.save(brinquedo);
    }

    public Optional<Brinquedo> atualizarCadastroDoBrinquedo(int id, BrinquedoDTO dto) {

        Optional<Brinquedo> existenteCodigo = brinquedoRepository.findAll().stream()
                .filter(b -> b.getCodigo() == dto.getCodigo())
                .findFirst();

        if (existenteCodigo.isPresent() && !existenteCodigo.get().getId().equals(id)) {
            throw new RuntimeException("Já existe um brinquedo com este código.");
        }

        Optional<Brinquedo> existenteDescricao = brinquedoRepository.findByDescricaoIgnoreCase(dto.getDescricao());

        if (existenteDescricao.isPresent() && !existenteDescricao.get().getId().equals(id)) {
            throw new RuntimeException("Já existe um brinquedo com esta descrição.");
        }

        return brinquedoRepository.findById(id).map(brinquedo -> {
            brinquedo.setCodigo(dto.getCodigo());
            brinquedo.setDescricao(dto.getDescricao());
            brinquedo.setCategoria(dto.getCategoria());
            brinquedo.setMarca(dto.getMarca());
            brinquedo.setImagem(dto.getImagem());
            brinquedo.setValor(dto.getValor());
            brinquedo.setDetalhes(dto.getDetalhes());
            brinquedo.setQuantVendas(dto.getQuantVendas());
            return brinquedoRepository.save(brinquedo);
        });
    }

    public void excluirCadastroDoBrinquedo(int id) {
        brinquedoRepository.deleteById(id);
    }

}

