import React, { useEffect, useMemo, useState } from 'react'
import { useTable, useSortBy, usePagination, useFilters, useGlobalFilter } from 'react-table';
import { 
  ChevronDown, ChevronUp, ChevronsLeft, ChevronsRight, 
  ChevronLeft, ChevronRight, Search, Download, RefreshCcw,
  Moon, Sun, Filter
} from 'lucide-react';

const FreelancerFormDisplay = () => {
  
  const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

   // Theme colors
   const theme = {
    light: {
      bg: 'bg-white',
      text: 'text-gray-600',
      border: 'border-gray-200',
      header: 'bg-gray-50',
      hover: 'hover:bg-gray-50',
      button: 'bg-blue-500 hover:bg-blue-600',
      buttonText: 'text-white',
      input: 'bg-white border-gray-200',
      accent: 'blue'
    },
    dark: {
      bg: 'bg-gray-800',
      text: 'text-gray-200',
      border: 'border-gray-700',
      header: 'bg-gray-900',
      hover: 'hover:bg-gray-700',
      button: 'bg-blue-600 hover:bg-blue-700',
      buttonText: 'text-gray-100',
      input: 'bg-gray-700 border-gray-600',
      accent: 'blue'
    }
  };

  const currentTheme = isDark ? theme.dark : theme.light;
  const fetchData = () => {
    setLoading(true);
    fetch(SHEET_URL,
      {
         method: "GET",
         cors: "no-cors"  
      }
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok (Status: ${response.status})`);
        }
        return response.json();
      })
      .then(data => {
        setSheetData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
 // Enhanced Column Filter
 function DefaultColumnFilter({
  column: { filterValue, setFilter, Header },
}) {
  return (
    <div className="relative group">
      <Search className={`absolute left-2 top-2.5 h-4 w-4 ${currentTheme.text} opacity-40`} />
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value || undefined)}
        placeholder={`Search ${Header}...`}
        className={`w-full pl-8 pr-2 py-2 rounded-lg text-sm 
          ${currentTheme.input} ${currentTheme.text}
          focus:outline-none focus:ring-2 focus:ring-${currentTheme.accent}-500 
          transition-all duration-200`}
      />
    </div>
  );
}

// Global Search Component
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <div className="relative w-64">
      <Search className={`absolute left-3 top-3 h-5 w-5 ${currentTheme.text} opacity-40`} />
      <input
        value={globalFilter || ''}
        onChange={e => setGlobalFilter(e.target.value || undefined)}
        placeholder="Search all columns..."
        className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm 
          ${currentTheme.input} ${currentTheme.text}
          focus:outline-none focus:ring-2 focus:ring-${currentTheme.accent}-500 
          transition-all duration-200`}
      />
    </div>
  );
};

const columns = useMemo(() => {
  if (sheetData.length === 0) return [];
  return Object.keys(sheetData[0]).map(key => ({
    Header: key.charAt(0).toUpperCase() + key.slice(1),
    accessor: key,
    Filter: DefaultColumnFilter
  }));
}, [sheetData]);

const data = useMemo(() => sheetData, [sheetData]);

const tableInstance = useTable(
  {
    columns,
    data,
    initialState: { pageSize: 10 },
    autoResetPage: false,
  },
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination
);

const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  prepareRow,
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  state: { pageIndex, pageSize }
} = tableInstance;

// Export to CSV
const exportToCSV = () => {
  const headers = columns.map(col => col.Header);
  const csvData = data.map(row => columns.map(col => row[col.accessor]));
  const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'table_data.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

if (loading) {
  return (
    <div className={`flex justify-center items-center h-64 ${currentTheme.bg} rounded-lg`}>
      <RefreshCcw className={`h-12 w-12 ${currentTheme.text} animate-spin`} />
    </div>
  );
}

if (error) {
  return (
    <div className="text-center p-8 bg-red-50 text-red-600 rounded-lg animate-fade-in">
      <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
      <p>{error.message}</p>
    </div>
  );
}

return (
  <div className={`${currentTheme.bg} rounded-lg shadow-xl p-6 max-w-full overflow-hidden transition-colors duration-200`}>
    {/* Table Controls */}
    <div className="flex justify-between items-center mb-6">
      <GlobalFilter 
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2 rounded-lg ${currentTheme.hover} transition-colors`}
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button
          onClick={exportToCSV}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg 
            ${currentTheme.button} ${currentTheme.buttonText}
            transition-colors duration-200`}
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map(headerGroup => (
            <>
              <tr {...headerGroup.getHeaderGroupProps()} className={currentTheme.header}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`px-6 py-4 text-left text-sm font-semibold ${currentTheme.text} 
                      cursor-pointer ${currentTheme.hover} transition-colors duration-200`}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{column.render('Header')}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronUp className="h-4 w-4" />
                          )
                        ) : (
                          <Filter className="h-4 w-4" />
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
              <tr>
                {headerGroup.headers.map(column => (
                  <th className={`px-6 py-3 ${currentTheme.bg}`}>
                    {column.canFilter ? column.render('Filter') : null}
                  </th>
                ))}
              </tr>
            </>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr 
                {...row.getRowProps()} 
                className={`${currentTheme.hover} transition-colors duration-200 
                  border-t ${currentTheme.border} group`}
              >
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    className={`px-6 py-4 text-sm ${currentTheme.text}`}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {/* Pagination */}
    <div className={`flex items-center justify-between mt-4 px-4 py-3 ${currentTheme.header} rounded-lg`}>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className={`p-2 rounded-md ${currentTheme.hover} 
            disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
        >
          <ChevronsLeft className={`h-5 w-5 ${currentTheme.text}`} />
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={`p-2 rounded-md ${currentTheme.hover} 
            disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
        >
          <ChevronLeft className={`h-5 w-5 ${currentTheme.text}`} />
        </button>
        <span className={`px-4 py-2 text-sm ${currentTheme.text}`}>
          Page <span className="font-medium">{pageIndex + 1}</span> of{' '}
          <span className="font-medium">{pageOptions.length}</span>
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={`p-2 rounded-md ${currentTheme.hover} 
            disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
        >
          <ChevronRight className={`h-5 w-5 ${currentTheme.text}`} />
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className={`p-2 rounded-md ${currentTheme.hover} 
            disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
        >
          <ChevronsRight className={`h-5 w-5 ${currentTheme.text}`} />
        </button>
      </div>

      <select
        value={pageSize}
        onChange={e => setPageSize(Number(e.target.value))}
        className={`text-sm rounded-md ${currentTheme.input} ${currentTheme.text}
          focus:ring-2 focus:ring-${currentTheme.accent}-500 focus:outline-none
          transition-colors duration-200`}
      >
        {[10, 20, 30, 40, 50].map(size => (
          <option key={size} value={size}>
            Show {size}
          </option>
        ))}
      </select>
    </div>
  </div>
);
}

export default FreelancerFormDisplay