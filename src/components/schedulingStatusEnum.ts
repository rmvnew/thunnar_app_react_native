// File: src/common/enum/schedulingStatusEnum.ts

/**
 * Este enum só define os “códigos” (valores) que o backend espera,
 * todos em maiúsculo. Exatamente: “CONFIRMED”, “PENDING”, “CANCELED” etc.
 */
export enum TypeSchedulingStatus {
    NONE = '',
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
    RESCHEDULED = 'RESCHEDULED',
    NO_SHOW = 'NO_SHOW',
    FAILED = 'FAILED',
}

/**
 * Mapeia cada valor do enum para o texto que o usuário verá na tela.
 * Ex.: "PENDING" → "Aguardando confirmação"
 */
export const SchedulingStatusLabel: Record<TypeSchedulingStatus, string> = {
    [TypeSchedulingStatus.NONE]: '',
    [TypeSchedulingStatus.PENDING]: 'Aguardando confirmação',
    [TypeSchedulingStatus.CONFIRMED]: 'Confirmado',
    [TypeSchedulingStatus.IN_PROGRESS]: 'Executando',
    [TypeSchedulingStatus.COMPLETED]: 'Finalizado',
    [TypeSchedulingStatus.CANCELED]: 'Cancelado',
    [TypeSchedulingStatus.RESCHEDULED]: 'Reagendado',
    [TypeSchedulingStatus.NO_SHOW]: 'Cliente não estava no local',
    [TypeSchedulingStatus.FAILED]: 'Visita não pôde ser concluída',
};


export const SchedulingStatusColor: Record<TypeSchedulingStatus, string> = {
    [TypeSchedulingStatus.NONE]: '#888888',  // cinza neutro (status não definido)
    [TypeSchedulingStatus.PENDING]: '#FFA500',  // laranja (aguardando)
    [TypeSchedulingStatus.CONFIRMED]: '#2E8B57',  // verde (confirmado)
    [TypeSchedulingStatus.IN_PROGRESS]: '#1E90FF',  // azul (em andamento)
    [TypeSchedulingStatus.COMPLETED]: '#6A5ACD',  // roxo (finalizado)
    [TypeSchedulingStatus.CANCELED]: '#FF4500',  // vermelho (cancelado)
    [TypeSchedulingStatus.RESCHEDULED]: '#DAA520',  // amarelo escuro (reagendado)
    [TypeSchedulingStatus.NO_SHOW]: '#DC143C',  // carmesim (não compareceu)
    [TypeSchedulingStatus.FAILED]: '#B22222',  // firebrick (falhou)
};