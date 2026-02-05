import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Pillar {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}