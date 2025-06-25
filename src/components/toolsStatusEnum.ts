// File: src/common/enum/toolsStatusEnum.ts

/**
 * Este enum define os “códigos” (valores) que o backend espera,
 * todos em maiúsculo. Exatamente: “AVAILABLE”, “UNAVAILABLE”, “IN_USE” etc.
 */
export enum TypeToolsConditionStatus {
    NONE = '', // Não definido ou estado inicial
    AVAILABLE = 'AVAILABLE', // Disponível para uso
    UNAVAILABLE = 'UNAVAILABLE', // Indisponível para uso
    IN_USE = 'IN_USE', // Em uso por um cliente ou funcionário
    UNDER_MAINTENANCE = 'UNDER_MAINTENANCE', // Em manutenção
    DAMAGED = 'DAMAGED', // Danificado e não utilizável
}

/**
 * Mapeia cada valor do enum para o texto que o usuário verá na tela.
 * Ex.: "AVAILABLE" → "Disponível"
 */
export const ToolsConditionStatusLabel: Record<TypeToolsConditionStatus, string> = {
    [TypeToolsConditionStatus.NONE]: '',
    [TypeToolsConditionStatus.AVAILABLE]: 'Disponível',
    [TypeToolsConditionStatus.UNAVAILABLE]: 'Indisponível',
    [TypeToolsConditionStatus.IN_USE]: 'Em uso',
    [TypeToolsConditionStatus.UNDER_MAINTENANCE]: 'Em manutenção',
    [TypeToolsConditionStatus.DAMAGED]: 'Danificado',
};

/**
 * Mapeia cada valor do enum para uma cor padrão a ser usada na UI.
 */
export const ToolsConditionStatusColor: Record<TypeToolsConditionStatus, string> = {
    [TypeToolsConditionStatus.NONE]: '#888888', // cinza neutro (não definido)
    [TypeToolsConditionStatus.AVAILABLE]: '#2E8B57', // verde (disponível)
    [TypeToolsConditionStatus.UNAVAILABLE]: '#FF4500', // vermelho (indisponível)
    [TypeToolsConditionStatus.IN_USE]: '#1E90FF', // azul (em uso)
    [TypeToolsConditionStatus.UNDER_MAINTENANCE]: '#DAA520', // amarelo escuro (em manutenção)
    [TypeToolsConditionStatus.DAMAGED]: '#B22222', // firebrick (danificado)
};
