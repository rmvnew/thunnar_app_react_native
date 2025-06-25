// File: src/common/enum/typeDeviceStatusEnum.ts

/**
 * Este enum define os “códigos” (valores) que o backend espera,
 * todos em maiúsculo. Exatamente: “WAITING”, “IN_PROGRESS” etc.
 */
export enum TypeDeviceStatus {
    NONE = '',
    WAITING = 'WAITING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
    RETURNED = 'RETURNED',
}

/**
 * Versão em português do enum, caso precise.
 */
export enum TypeDeviceStatusBr {
    NONE = '',
    WAITING = 'Aguardando',
    IN_PROGRESS = 'Em andamento',
    COMPLETED = 'Concluído',
    CANCELED = 'Cancelado',
    RETURNED = 'Devolvido',
}

/**
 * Mapeia cada valor do enum para o texto que o usuário verá na tela.
 * Ex.: "WAITING" → "Aguardando"
 */
export const TypeDeviceStatusLabel: Record<TypeDeviceStatus, string> = {
    [TypeDeviceStatus.NONE]: '',
    [TypeDeviceStatus.WAITING]: 'Aguardando',
    [TypeDeviceStatus.IN_PROGRESS]: 'Em andamento',
    [TypeDeviceStatus.COMPLETED]: 'Concluído',
    [TypeDeviceStatus.CANCELED]: 'Cancelado',
    [TypeDeviceStatus.RETURNED]: 'Devolvido',
};

/**
 * Mapeia cada valor do enum para uma cor padrão a ser usada na UI.
 */
export const TypeDeviceStatusColor: Record<TypeDeviceStatus, string> = {
    [TypeDeviceStatus.NONE]: '#808080',       // cinza (nenhum)
    [TypeDeviceStatus.WAITING]: '#FFA500',    // laranja (aguardando)
    [TypeDeviceStatus.IN_PROGRESS]: '#1E90FF',// azul (em andamento)
    [TypeDeviceStatus.COMPLETED]: '#228B22',  // verde (concluído)
    [TypeDeviceStatus.CANCELED]: '#B22222',   // vermelho (cancelado)
    [TypeDeviceStatus.RETURNED]: '#8B4513',   // marrom (devolvido)
};
