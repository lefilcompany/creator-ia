import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, type = 'content' } = await req.json()

    if (!prompt) {
      throw new Error('Prompt é obrigatório')
    }

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY não configurado')
    }

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: `Você é um especialista em marketing digital e criação de conteúdo. 
            ${type === 'content' ? 'Crie conteúdo engajante e persuasivo para redes sociais.' : ''}
            ${type === 'planning' ? 'Crie um planejamento estratégico de conteúdo detalhado.' : ''}
            ${type === 'review' ? 'Faça uma análise crítica e construtiva do conteúdo fornecido.' : ''}
            Seja criativo, profissional e adequado ao público-alvo.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    if (!openAIResponse.ok) {
      throw new Error(`Erro na API OpenAI: ${openAIResponse.status}`)
    }

    const data = await openAIResponse.json()
    const generatedContent = data.choices[0]?.message?.content

    return new Response(
      JSON.stringify({ content: generatedContent }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Erro:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})