import express from 'express';
const app = express();
const PORT = process.env.PORT || 10000;
app.use(express.json({ limit: '1mb' }));
app.use(express.static('.'));
function buildPrompt(body) {
  return `Você é um especialista em elaboração de itens técnicos de Redes de Computadores.

Regras obrigatórias:
1. Avaliar apenas uma habilidade.
2. Produzir situação-estímulo, comando dependente do contexto, 4 alternativas homogêneas, gabarito e justificativas A a D.
3. Garantir que sem o contexto o comando não seja corretamente resolvível.
4. Criar distratores plausíveis com base em erros técnicos comuns.
5. Restringir o item ao escopo curricular informado.
6. Quando houver norma técnica, usá-la de modo coerente, sem inventar exigências falsas.
7. Responder apenas com JSON válido.

Saída JSON exata:
{
  "analise": "...",
  "situacao": "...",
  "comando": "...",
  "alternativas": {"A": "...", "B": "...", "C": "...", "D": "..."},
  "gabarito": "A",
  "justificativas": {"A": "...", "B": "...", "C": "...", "D": "..."},
  "validacao": {
    "contexto_funcional": true,
    "comando_depende_contexto": true,
    "sem_contexto_perde_sentido": true,
    "comando_retoma_elementos": true,
    "alternativas_mesmo_universo": true,
    "correta_nao_obvia": true,
    "distratores_plausiveis": true,
    "justificativa_sustentada": true
  }
}

Dados do item:
UC: ${body.uc} - ${body.uc_nome}
Competência: ${body.competencia}
Habilidade: ${body.habilidade}
Conhecimento relacionado: ${body.conhecimento}
Bloom: ${body.bloom_nivel} | ${body.bloom_processo} | ${body.bloom_conhecimento}
Dificuldade: ${body.dificuldade}
Tipo de conhecimento: ${body.tipo_conhecimento}
Norma técnica: ${body.norma_tecnica}
Observações: ${body.observacoes || 'Nenhuma'}
`;
}
app.post('/api/gerar-item', async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: 'A variável GEMINI_API_KEY não foi configurada no Render.' });
    const prompt = buildPrompt(req.body || {});
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.6, responseMimeType: 'application/json' }
      })
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || 'Erro na API Gemini', raw: data });
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return res.status(500).json({ error: 'A resposta do Gemini veio vazia.' });
    res.json(JSON.parse(text));
  } catch (error) {
    res.status(500).json({ error: error.message || 'Erro interno.' });
  }
});
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));
