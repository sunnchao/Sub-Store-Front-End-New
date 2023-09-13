<template>
  <h1 class="mb-[16px] pc-secondary-title">
    被保留节点
  </h1>
  <n-data-table
    striped
    :columns="compareColumns"
    :data="compareList"
    :bordered="false"
    :row-key="rowKey"
    :row-props="rowProps"
  />

  <h1 class="mb-[16px] mt-[48px] pc-secondary-title">
    被排除节点
  </h1>
  <n-data-table
    striped
    :columns="excludeColumns"
    :data="excludeList"
    :bordered="false"
    :row-key="rowKey"
    :row-props="rowProps"
  />
</template>

<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';
import { NTag } from 'naive-ui';
import { computed, h, toRaw } from 'vue';

const props = defineProps<{
  data: Compare.Data
}>();

type RowAction = {
  showInfo: (row: Compare.NodeInfo) => void
};

const rowKey = (rowData: Compare.NodeInfo) => rowData.id + rowData.name;
const getTagType = (rowData: Compare.NodeInfo) => {
  switch (rowData.type) {
    case 'trojan':
      return 'error';
    case 'ss':
      return 'warning';
    case 'socks5':
      return 'success';
    case 'http':
      return 'info';
    case 'shadowsocks':
      return 'warning';
    case 'vmess':
      return 'success';
    case 'custom':
      return 'info';
  }
};
const showInfo = (rowData: Compare.NodeInfo) => {
  console.log(toRaw(rowData));
};
const rowProps = (rowData: Compare.NodeInfo) => {
  return {
    onClick: () => showInfo(rowData),
  };
};

const columnBaseOptions: DataTableColumns<Compare.NodeInfo> = [
  {
    title: '服务器',
    key: 'server',
    resizable: true,
  },
  {
    title: 'UDP',
    key: 'udp',
    width: 96,
    align: 'center',
    render(row) {
      return h('i', {
        class: row.udp
          ? 'i-solar-bolt-circle-bold-duotone w-[96px] pc-compare-icon-true'
          : 'i-solar-bolt-circle-bold-duotone w-[96px] pc-compare-icon-false',
      });
    },
  },
  {
    title: 'TFO',
    key: 'tfo',
    width: 96,
    align: 'center',
    render(row) {
      return h('i', {
        class: row.udp
          ? 'i-solar-bolt-circle-bold-duotone w-[96px] pc-compare-icon-true'
          : 'i-solar-bolt-circle-bold-duotone w-[96px] pc-compare-icon-false',
      });
    },
  },
  {
    title: 'SCERT',
    key: 'skip-cert-verify',
    width: 96,
    align: 'center',
    render(row) {
      return h('i', {
        class: row.udp
          ? 'i-solar-bolt-circle-bold-duotone w-[96px] pc-compare-icon-true'
          : 'i-solar-bolt-circle-bold-duotone w-[96px] pc-compare-icon-false',
      });
    },
  },
];

const createCompareColumns = ({
  showInfo,
}: RowAction): DataTableColumns<Compare.NodeInfo> => {
  return [
    {
      title: 'ID',
      key: 'id',
      rowSpan: () => 2,
      width: 72,
      align: 'center',
    },
    {
      title: '节点类型',
      key: 'type',
      rowSpan: () => 2,
      width: 96,
      align: 'center',
      render(row) {
        const type = getTagType(row);
        return h(NTag, { type }, { default: () => row.type });
      },
    },
    {
      title: '节点名称',
      key: 'name',
      resizable: true,
      render(row, rowIndex) {
        const type = rowIndex % 2 === 0 ? '' : 'success';
        const tagText = rowIndex % 2 === 0 ? 'Old' : 'New';
        const textClass
          = rowIndex % 2 === 0
            ? 'text-text-tertiary-light dark:text-text-tertiary-dark'
            : 'text-text-primary-light dark:text-text-primary-dark font-medium';
        return h('div', { class: 'flex items-center gap-x-[8px]' }, [
          h(
            NTag,
            {
              type,
              size: 'small',
              bordered: false,
            },
            { default: () => tagText },
          ),
          h('span', { class: textClass }, { default: () => row.name }),
        ]);
      },
    },
    ...columnBaseOptions,
    // {
    //   title: '操作',
    //   key: 'actions',
    //   align: 'center',
    //   render(row) {
    //     return h(
    //       NButton,
    //       {
    //         tertiary: true,
    //         size: 'small',
    //         onClick: () => showInfo(row),
    //       },
    //       { default: () => '节点详情' },
    //     );
    //   },
    // },
  ];
};

const createExcludeColumns = ({
  showInfo,
}: RowAction): DataTableColumns<Compare.NodeInfo> => {
  return [
    {
      title: 'ID',
      key: 'id',
      width: 72,
      align: 'center',
    },
    {
      title: '节点类型',
      key: 'type',
      width: 96,
      align: 'center',
      render(row) {
        const type = getTagType(row);
        return h(NTag, { type }, { default: () => row.type });
      },
    },
    {
      title: '节点名称',
      key: 'name',
      resizable: true,
    },
    ...columnBaseOptions,
    // {
    //   title: '操作',
    //   key: 'actions',
    //   align: 'center',
    //   render(row) {
    //     return h(
    //       NButton,
    //       {
    //         tertiary: true,
    //         size: 'small',
    //         onClick: () => showInfo(row),
    //       },
    //       { default: () => '节点详情' },
    //     );
    //   },
    // },
  ];
};

const compareList = computed(() => {
  return props.data.processed
    .map(node => [
      props.data.original.find(item => item.id === node.id)!,
      node,
    ])
    .flat();
});
const excludeList = computed(() => {
  return props.data.original.filter((node) => {
    return !props.data.processed.find(item => item.id === node.id);
  });
});

const compareColumns = computed(() => createCompareColumns({ showInfo }));
const excludeColumns = computed(() => createExcludeColumns({ showInfo }));
</script>
