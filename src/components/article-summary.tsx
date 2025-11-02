'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getArticleSummary } from '@/app/actions';
import { Wand2, Loader2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface ArticleSummaryProps {
  contentToSummarize: string;
}

export function ArticleSummary({ contentToSummarize }: ArticleSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSummarize = async () => {
    setIsLoading(true);
    setError(null);
    setSummary(null);

    const result = await getArticleSummary(contentToSummarize);

    if (result.error) {
      setError(result.error);
      toast({
        variant: "destructive",
        title: "Erro na Sumarização",
        description: result.error,
      });
    } else if (result.summary) {
      setSummary(result.summary);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleSummarize} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Gerando Resumo...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" />
            Gerar Resumo com IA
          </>
        )}
      </Button>

      {error && !isLoading && (
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Falha na Geração</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {summary && !isLoading && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-primary">
              <Wand2 className="h-5 w-5" />
              Resumo da IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/90 leading-relaxed">{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
