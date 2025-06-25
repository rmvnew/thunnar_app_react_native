// File: src/common/enum/workOrderServiceTypeEnum.ts

/**
 * Este enum define os “códigos” (valores) que o backend espera,
 * todos em maiúsculo. Exatamente: “INTERNAL”, “EXTERNAL”.
 */
export enum WorkOrderServiceType {
    NONE = '',
    INTERNAL = 'INTERNAL', // Serviço interno
    EXTERNAL = 'EXTERNAL'  // Serviço externo
}

export enum WorkOrderServiceTypeBr {
    NONE = '',
    INTERNAL = 'Interno', // Serviço interno
    EXTERNAL = 'Externo'  // Serviço externo
}



/**
 * Mapeia cada valor do enum para o texto que o usuário verá na tela.
 * Ex.: "INTERNAL" → "Serviço interno"
 */
export const WorkOrderServiceTypeLabel: Record<WorkOrderServiceType, string> = {
    [WorkOrderServiceType.NONE]: '',
    [WorkOrderServiceType.INTERNAL]: 'Serviço interno',
    [WorkOrderServiceType.EXTERNAL]: 'Serviço externo',
};

/**
 * Mapeia cada valor do enum para uma cor padrão a ser usada na UI.
 */
export const WorkOrderServiceTypeColor: Record<WorkOrderServiceType, string> = {
    [WorkOrderServiceType.NONE]: '#808080', // cinza (nenhum)
    [WorkOrderServiceType.INTERNAL]: '#1E90FF', // azul (interno)
    [WorkOrderServiceType.EXTERNAL]: '#FF8C00', // laranja escuro (externo)
};
