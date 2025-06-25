// File: src/common/enum/movimentStatusEnum.ts

/**
 * Este enum define os “códigos” (valores) que o backend espera,
 * todos em maiúsculo. Exatamente: “WAITING”, “APPROVED”, “CANCELED” etc.
 */
export enum TypeMovimentStatus {
    NONE = '',              // Não definido ou estado inicial
    WAITING = 'WAITING',    // Pendente de aprovação
    APPROVED = 'APPROVED',  // Aprovado
    CREATED = 'CREATED',    // Criado (não usado no frontend, mas pode ser útil no backend)
    CANCELED = 'CANCELED',  // Cancelado
    IN_PROGRESS = 'IN_PROGRESS',        // Em progresso
    COMPLETED_FULL = 'COMPLETED_FULL',  // Completo (Total)
    COMPLETED_PARTIAL = 'COMPLETED_PARTIAL', // Completo (Parcial)
    RETURNED = 'RETURNED',  // Devolvido
}

/**
 * Mapeia cada valor do enum para o texto que o usuário verá na tela.
 */
export const MovimentStatusLabel: Record<TypeMovimentStatus, string> = {
    [TypeMovimentStatus.NONE]: '',
    [TypeMovimentStatus.WAITING]: 'Pendente',
    [TypeMovimentStatus.APPROVED]: 'Aprovado',
    [TypeMovimentStatus.CREATED]: 'Criado',
    [TypeMovimentStatus.CANCELED]: 'Cancelado',
    [TypeMovimentStatus.IN_PROGRESS]: 'Em progresso',
    [TypeMovimentStatus.COMPLETED_FULL]: 'Completo (Total)',
    [TypeMovimentStatus.COMPLETED_PARTIAL]: 'Completo (Parcial)',
    [TypeMovimentStatus.RETURNED]: 'Devolvido',
};

/**
 * Mapeia cada valor do enum para uma cor padrão a ser usada na UI.
 */
export const MovimentStatusColor: Record<TypeMovimentStatus, string> = {
    [TypeMovimentStatus.NONE]: '#888888',          // cinza neutro
    [TypeMovimentStatus.WAITING]: '#FFC107',       // amarelo (pendente)
    [TypeMovimentStatus.APPROVED]: '#28A745',      // verde (aprovado)
    [TypeMovimentStatus.CREATED]: '#6C757D',       // cinza escuro (criado)
    [TypeMovimentStatus.CANCELED]: '#DC3545',      // vermelho (cancelado)
    [TypeMovimentStatus.IN_PROGRESS]: '#17A2B8',   // azul (em progresso)
    [TypeMovimentStatus.COMPLETED_FULL]: '#2E8B57',    // verde escuro (completo total)
    [TypeMovimentStatus.COMPLETED_PARTIAL]: '#20C997', // verde claro (completo parcial)
    [TypeMovimentStatus.RETURNED]: '#6F42C1',      // roxo (devolvido)
};
