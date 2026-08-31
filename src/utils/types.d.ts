export type TPostMetadata = {
    items_per_page: number,
    current_page_items: number,
    current_page: number,
    total_items: number,
    total_pages: number
}



export type TRequest = {
  request_id: string,
  role_id: string,
  value_proposition: string,
  contact: string,
  status: string,
  role: {
      role_id: string,
      name: string,
      createdAt: Date,
      updatedAt: Date
    }
  user_id: string,
  reviewed_at?: Date,
  reviewed_by?: string
  createdAt: Date,
  updatedAt: Date
}


export type TOpenRole = {
    role_id: string;
    createdAt: Date;
    updatedAt: Date;
    open_id: string;
    title: string;
    description: string | null;
    notes: string;
    slots: number;
    isActive: boolean;
    role: {
        role_id: string;
        name: $Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    };
}


export type TUser =  {
 createdAt: Date;
 updatedAt: Date;
 Role: $Enums.Role;
 users_id: string;
 email: string;
 username: string;
 firstname: string;
 lastname: string;
 password: string;
 role_status: $Enums.Role_Status;
 isWarned: boolean;
 isOwner: boolean;
 profilePic: string | null;
}