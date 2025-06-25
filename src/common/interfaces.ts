// import { TypeOrderStatus } from "../components/enum/order";

import { TypeMovimentStatus } from "../components/movimentStatusEnum";
import { TypeSchedulingStatus } from "../components/schedulingStatusEnum";
import { TypeToolsConditionStatus } from "../components/toolsStatusEnum";





export type ProfileName = 'ADMIN' | 'MANAGER' | 'OWNER' | 'USER';

interface Profile {
    profile_id: number;
    profile_name: ProfileName;
}


export interface PhoneInterface {
    phone_id: number;
    phone_number: string;
}


export interface AddressInterface {
    address_id: number;
    address_city: string;
    address_state: string;
    address_street: string;
    address_neighborhood: string;
    address_number: string;
    address_zipcod: string;
}


export interface CompanyInterface {
    company_id: number;
    company_name: string;
    company_cnpj: string;
    company_status: number;
    company_email: string;
    created_at: Date;
    updated_at: Date;
    phone_id: number;
    address_id: number;
    phone?: PhoneInterface;
    address?: AddressInterface;
}


export interface ClientInterface {
    client_id: number;
    client_name: string;
    client_cpf?: string;
    client_cnpj?: string;
    client_email: string;
    client_is_company: boolean;
    client_status: boolean;
    created_at: string;
    updated_at: string;
    phone: PhoneInterface;
    address: AddressInterface;
    company: CompanyInterface;
}


export interface DeviceInterface {
    device_id: number;
    device_name: string;
    device_brand: string;
    device_model: string;
    device_serial_number: string;
    device_is_under_warranty: boolean;
    device_warranty_end_date: string;
    device_status: boolean;
    created_at: string;
    updated_at: string;
    company: CompanyInterface;
    client: ClientInterface;

}


export interface servicePerformedInterface {
    service_performed_id: number;
    service_performed_name: string;
    service_performed_description: string;
    service_performed_cost: string;

}

interface ClientBasic {
    client_id: number;
    client_name: string;
    phone: PhoneInterface;
}

export interface WorkOrderInterface {
    work_order_id: number;
    order_number: number;
    start_date: string;
    service_type: string;
    status: string;
    clientId: number;
    userId: number;
    client: ClientBasic;

}


export interface Company {
    company_id: number;
    company_name: string;

}


//  


export interface ProductInterface {

    product_id: number
    product_name?: string
    product_quantity: number
    product_barcode?: string
    product_unit_price?: number
    product_status?: boolean
    created_at?: Date
    product_location?: string
    product_return_status: number
    product_ncm: string,
    product_cfop: string,
    product_cest: string,
    product_unit: string,
    product_origin: number,
    product_cst: string,
}

export interface SaleItem {
    product_id: number
    product_quantity: number
    discount: number
}

export interface Sale {
    sale_id: number;
    sale_number: number;
    total: string;
    created_at: string;
    user: {
        user_name: string;
    };
}


// Em src/common/interfaces/index.ts
// (ou onde estiver a sua SchedulingInterface)

export interface SchedulingInterface {
    scheduling_id: number;
    scheduling_date: string;
    scheduling_description: string;
    // Agora o tipo é TypeSchedulingStatus (vai conter apenas "PENDING", "CONFIRMED", etc.)
    notify_active: boolean;
    scheduling_status: TypeSchedulingStatus;
    client_id: number;
    created_at: string;
    updated_at: string;

    client: {
        client_id: number;
        client_name: string;
        client_cpf?: string;
        client_cnpj?: string;
        client_email: string;
        client_is_company: number;
        client_status: number;
        created_at: string;
        updated_at: string;
        company_id: number;
        phone_id: number;
        address_id: number;
        TB_PHONE: { phone_id: number; phone_number: string };
    };

    company: {
        company_id: number;
        company_name: string;
        company_cnpj: string;
        company_email: string;
        company_status: number;
        created_at: string;
        updated_at: string;
        company_logo_url: string;
        representative_logos_urls: string;
        phone_id: number;
        address_id: number;
        TB_PHONE: { phone_id: number; phone_number: string };
        parametrization: {
            have_workOrder: boolean;
            have_sale: boolean;
            have_tools: boolean;
            have_client: boolean;
            have_scheduler: boolean;
        }
    };

    user: {
        user_id: number;
        user_name: string;
        user_email: string;
    };
}

export interface StatusMovimentProps {
    status: TypeMovimentStatus;
}

export interface StatusProps {
    status: TypeSchedulingStatus;
}

export interface StatusToolsProps {
    status: TypeToolsConditionStatus;
}


export interface StatusNotify {
    status: boolean
}





export interface PendingInterface {
    pending_id: number;
    pending_date: string;
    pending_title: string;
    pending_description: string;
    notify_active: boolean;
    pending_status: TypeSchedulingStatus;
    created_at: string;
    updated_at: string;

    company: {
        company_id: number;
        company_name: string;
        company_cnpj: string;
        company_email: string;
        company_status: number;
        created_at: string;
        updated_at: string;
        company_logo_url: string;
        representative_logos_urls: string;
        phone_id: number;
        address_id: number;
        TB_PHONE: { phone_id: number; phone_number: string };
    };

    user: {
        user_id: number;
        user_name: string;
        user_email: string;
    };
}



export interface ToolsInterface {
    tools_id: number;
    tools_name?: string;
    tools_part_number?: string;
    tools_heritage_number?: string;
    tools_condition?: TypeToolsConditionStatus;
    tools_brand?: string;
    tools_model?: string;
    tools_status?: number;
    tools_quantity?: number;
    tools_return_status: number | null;
    created_at?: Date;
    updated_at?: Date;
    company?: Company;
}


export interface MovimentInterface {
    moviment_id: number;
    moviment_reason: string;
    moviment_description: string;
    moviment_status: TypeMovimentStatus;
    created_at: string;       // ISO date string
    updated_at: string;       // ISO date string
    start_date: string
    end_date?: string
    user_id?: number;
    company_id: number;
    client_id: number;
    tools_id?: number | null;
    product_id?: number | null;
    tools_quantity?: number | null;
    product_quantity?: number | null;
    tools_return_status?: number | null;
    product_return_status?: number | null;

    client: {
        client_id: number;
        client_name: string;
        client_cpf?: string | null;
        client_cnpj?: string | null;
        client_email: string;
        client_is_company: number;
        client_status: number;
        created_at: string;
        updated_at: string;
        company_id: number;
        phone_id: number;
        address_id: number;
        TB_PHONE: {
            phone_id: number;
            phone_number: string;
        };
    };

    company: {
        company_id: number;
        company_name: string;
        company_cnpj: string;
        company_email: string;
        company_status: number;
        created_at: string;
        updated_at: string;
        company_logo_url: string;
        representative_logos_urls: string;
        phone_id: number;
        address_id: number;
        parametrization: {
            have_workOrder: boolean;
            have_sale: boolean;
            have_tools: boolean;
            have_client: boolean;
            have_scheduler: boolean;
        };
        TB_PHONE: {
            phone_id: number;
            phone_number: string;
        };
    };

    tools?: {
        tools_id: number;
        tools_name: string;
        tools_condition: string;
        tools_status: number;
        created_at: string;
        updated_at: string;
        company_id: number;
        tools_heritage_number: string;
        tools_brand: string;
        tools_model: string;
        tools_part_number: string;
    } | null;

    product?: {
        product_id: number;
        product_name: string;
        product_quantity: number;
        product_barcode: string;
        product_unit_price: number;
        product_ncm: string;
        product_cfop: string;
        product_cost: number;
    } | null;

    user?: {
        user_id: number;
        user_name: string;
        user_email: string;
    } | null;
}

export interface UserInterface {
    user_id: number;
    user_name: string;
    user_email: string;
}