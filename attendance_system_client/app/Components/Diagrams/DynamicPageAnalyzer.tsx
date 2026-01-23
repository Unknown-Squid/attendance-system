"use client";

import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Panel,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import Select from "@/app/Components/Fields/Select";
import { pageStructures, availablePages, ComponentInfo } from "@/app/Data/pageStructures";

// Helper function to filter out CSS/styling and text content from descriptions
// Only keeps attributes like type=, variant=, name=, etc.
function cleanDescription(description: string | undefined): string | undefined {
  if (!description) return undefined;
  
  let cleaned = description;
  
  // Remove text content after " - " (actual text inside elements)
  const dashIndex = cleaned.indexOf(" - ");
  if (dashIndex !== -1) {
    cleaned = cleaned.substring(0, dashIndex).trim();
  }
  
  // Remove all CSS classes (common Tailwind patterns)
  // Remove spacing, sizing, colors, layout, etc.
  cleaned = cleaned.replace(/\s*(flex|grid|block|inline|hidden|absolute|relative|fixed|sticky)[\s,)]*/gi, "");
  cleaned = cleaned.replace(/\s*(min-h|max-h|min-w|max-w|w-|h-|p-|m-|px-|py-|mx-|my-|pt-|pb-|pl-|pr-|mt-|mb-|ml-|mr-)[^\s,)]+/gi, "");
  cleaned = cleaned.replace(/\s*(bg-|text-|border-|rounded-|shadow-|opacity-|z-|gap-|space-)[^\s,)]+/gi, "");
  cleaned = cleaned.replace(/\s*(items-|justify-|flex-col|flex-row|flex-wrap|overflow-|cursor-|transition-|focus:|hover:)[^\s,)]*/gi, "");
  cleaned = cleaned.replace(/\s*(dark:)[^\s,)]+/gi, "");
  cleaned = cleaned.replace(/\s*(className|class)=[^,)]+/gi, "");
  
  // Remove label= values (text content, not attributes we want to show)
  cleaned = cleaned.replace(/\s*label=[^,)]+/gi, "");
  
  // Remove placeholder=, value=, error= (these are just content)
  cleaned = cleaned.replace(/\s*(placeholder|value|error|onClick|onChange|onSubmit|onClose|onConfirm)=[^,)]+/gi, "");
  
  // Remove text content that's not an attribute (plain text without =)
  // But keep attributes like type=, variant=, name=, id=, href=, src=, alt=, role=, aria-*, data-*
  const attributePattern = /(type|variant|id|name|href|src|alt|aria-|data-|role|required|disabled|isOpen|danger|confirmLabel)=/i;
  
  // Extract only attribute patterns
  const attributes: string[] = [];
  let match;
  const regex = new RegExp(attributePattern.source + '[^,\\s)]+', 'gi');
  while ((match = regex.exec(cleaned)) !== null) {
    attributes.push(match[0].trim());
  }
  
  // Keep metadata like (conditional)
  const metadataMatch = cleaned.match(/\([^)]+\)/);
  const metadata = metadataMatch ? metadataMatch[0] : "";
  
  // Combine attributes and metadata
  const result = [...attributes, metadata].filter(Boolean).join(", ");
  
  // If no attributes or metadata, return undefined
  return result.length > 0 ? result : undefined;
}

function buildNodesAndEdges(
  node: ComponentInfo,
  parentId: string | null = null,
  x: number = 0,
  y: number = 0,
  level: number = 0,
  nodes: Node[] = [],
  edges: Edge[] = [],
  maxWidth: { value: number } = { value: 0 },
  minX: { value: number } = { value: Infinity },
  positions: Map<string, { x: number; y: number }> = new Map()
): { nodes: Node[]; edges: Edge[]; subtreeWidth: number } {
  const nodeWidth = 200;
  const nodeHeight = 90;
  const horizontalSpacing = 320;
  const verticalSpacing = 200;

  const getNodeColor = (type: ComponentInfo["type"]) => {
    switch (type) {
      case "page":
        return "#3b82f6"; // blue
      case "container":
        return "#6b7280"; // gray
      case "component":
        return "#10b981"; // green
      case "section":
        return "#8b5cf6"; // purple
      case "element":
        return "#f97316"; // orange
      default:
        return "#9ca3af";
    }
  };

  const nodeColor = getNodeColor(node.type);

  // Calculate subtree widths for all children first (without creating nodes)
  const childSubtreeWidths: number[] = [];
  if (node.children && node.children.length > 0) {
    node.children.forEach((child) => {
      // Calculate subtree width recursively
      const calculateSubtreeWidth = (n: ComponentInfo): number => {
        if (!n.children || n.children.length === 0) {
          return nodeWidth;
        }
        const childWidths = n.children.map(calculateSubtreeWidth);
        const totalChildWidth = childWidths.reduce((sum, w) => sum + w, 0);
        const spacing = (n.children.length - 1) * horizontalSpacing;
        return Math.max(nodeWidth, totalChildWidth + spacing);
      };
      childSubtreeWidths.push(calculateSubtreeWidth(child));
    });
  }

  // Calculate total width needed for all children
  const totalChildrenWidth = childSubtreeWidths.length > 0 
    ? childSubtreeWidths.reduce((sum, width) => sum + width, 0)
    : 0;
  const totalSpacing = node.children && node.children.length > 0 
    ? (node.children.length - 1) * horizontalSpacing 
    : 0;
  const subtreeWidth = Math.max(nodeWidth, totalChildrenWidth + totalSpacing);

  // Parent node center is at x, but React Flow uses top-left corner for positioning
  // So we need to position the node at x - nodeWidth/2
  const parentX = x - nodeWidth / 2;
  minX.value = Math.min(minX.value, parentX);

  // Create current node
  const cleanedDesc = cleanDescription(node.description);
  const currentNode: Node = {
    id: node.id,
    type: "default",
    position: { x: parentX, y },
    data: {
      label: (
        <div className="p-3 text-center text-white w-full h-full flex flex-col justify-center">
          <div className="font-bold text-sm mb-1 break-words leading-tight">{node.name}</div>
          {cleanedDesc && (
            <div className="text-xs opacity-90 mb-1 break-words leading-tight px-1">{cleanedDesc}</div>
          )}
          {node.importPath && (
            <div className="text-xs opacity-70 font-mono truncate px-1 mt-1" title={node.importPath}>
              {node.importPath.split("/").pop()}
            </div>
          )}
          <div className="text-xs mt-1 opacity-75 bg-black/20 px-2 py-0.5 rounded inline-block">
            {node.type}
          </div>
        </div>
      ),
      nodeType: node.type,
    },
    style: {
      background: nodeColor,
      color: "#fff",
      border: "2px solid #fff",
      borderRadius: "8px",
      width: nodeWidth,
      minHeight: nodeHeight,
      fontSize: "11px",
      boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)",
    },
  };

  nodes.push(currentNode);
  // Store the center position, not the top-left position
  positions.set(node.id, { x: x, y });

  // Create edge from parent if exists
  if (parentId) {
    edges.push({
      id: `${parentId}-${node.id}`,
      source: parentId,
      target: node.id,
      type: "smoothstep",
      animated: true,
      style: { stroke: "#374151", strokeWidth: 3 },
      labelStyle: { fill: "#374151", fontWeight: 600 },
    });
  }

  // Process children - position them centered under parent
  if (node.children && node.children.length > 0 && childSubtreeWidths.length === node.children.length) {
    const childY = y + verticalSpacing;
    
    // Calculate positions for children
    // We want to center the CHILD NODES themselves under the parent, not their subtrees
    // So we calculate where each child node should be positioned
    const totalChildrenSpan = totalChildrenWidth + totalSpacing;
    
    // If we have multiple children, distribute them evenly
    // If we have one child, center it directly under parent
    if (node.children.length === 1) {
      // Single child: center it directly under parent
      const childResult = buildNodesAndEdges(
        node.children[0],
        node.id,
        x, // Center child node directly under parent center
        childY,
        level + 1,
        nodes,
        edges,
        maxWidth,
        minX,
        positions
      );
      nodes = childResult.nodes;
      edges = childResult.edges;
    } else {
      // Multiple children: distribute them evenly, but center the group under parent
      const childrenStartX = x - totalChildrenSpan / 2;
      let currentX = childrenStartX;

      node.children.forEach((child, index) => {
        // Each child's center X should be at the center of its subtree
        const childSubtreeWidth = childSubtreeWidths[index];
        const childCenterX = currentX + childSubtreeWidth / 2;
        
        // Pass the center X of the child's subtree
        // The buildNodesAndEdges function will position the child node centered at this X
        const childResult = buildNodesAndEdges(
          child,
          node.id,
          childCenterX,
          childY,
          level + 1,
          nodes,
          edges,
          maxWidth,
          minX,
          positions
        );
        nodes = childResult.nodes;
        edges = childResult.edges;
        
        // Move to next child's starting position
        currentX += childSubtreeWidth + horizontalSpacing;
      });
    }
  }

  return { nodes, edges, subtreeWidth };
}

// Tree component for displaying component hierarchy
interface TreeNodeProps {
  component: ComponentInfo;
  level: number;
  expandedNodes: Set<string>;
  onToggleExpand: (id: string) => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
}

const TreeNode = ({ component, level, expandedNodes, onToggleExpand, onSelect, selectedId }: TreeNodeProps) => {
  const hasChildren = component.children && component.children.length > 0;
  const isExpanded = expandedNodes.has(component.id);
  const isSelected = selectedId === component.id;
  const indent = level * 16;

  const handleClick = () => {
    onSelect(component.id);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      onToggleExpand(component.id);
    }
  };

  return (
    <div className="select-none">
      <div
        className={`flex items-center gap-1 py-1 px-2 rounded cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
          isSelected ? "bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700" : ""
        }`}
        style={{ paddingLeft: `${indent + 8}px` }}
        onClick={handleClick}
      >
        {hasChildren ? (
          <button
            onClick={handleToggle}
            className="w-4 h-4 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-foreground"
          >
            {isExpanded ? (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        ) : (
          <div className="w-4 h-4" />
        )}
        <span className="text-sm font-medium text-foreground flex-1 truncate">{component.name}</span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700">
          {component.type}
        </span>
      </div>
      {hasChildren && isExpanded && (
        <div>
          {component.children!.map((child) => (
            <TreeNode
              key={child.id}
              component={child}
              level={level + 1}
              expandedNodes={expandedNodes}
              onToggleExpand={onToggleExpand}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DynamicPageAnalyzer = () => {
  // Use first available page as default, or "login" if available
  const defaultPage = availablePages.length > 0
    ? (availablePages.find((p) => p.value === "login")?.value || availablePages[0].value)
    : "";

  const [selectedPage, setSelectedPage] = useState<string>(defaultPage);
  const [selectedComponentId, setSelectedComponentId] = useState<string>("");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  // Get current page structure
  const currentPageStructure = useMemo(() => {
    if (!selectedPage || !pageStructures[selectedPage]) {
      return null;
    }
    return pageStructures[selectedPage];
  }, [selectedPage]);

  // Expand root node by default when page changes
  useEffect(() => {
    if (currentPageStructure) {
      setExpandedNodes(new Set([currentPageStructure.id]));
    }
  }, [currentPageStructure]);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    if (!selectedPage) {
      return { nodes: [], edges: [] };
    }

    if (!pageStructures[selectedPage]) {
      return { nodes: [], edges: [] };
    }

    const structure = pageStructures[selectedPage];
    const result = buildNodesAndEdges(structure, null, 0, 0, 0);
    
    // Center and fit all nodes in view
    // We need to center based on node centers, not top-left positions
    // This preserves parent-child alignment since we shift all nodes by the same amount
    if (result.nodes.length > 0) {
      const allNodes = result.nodes;
      const nodeWidth = 200; // Same as in buildNodesAndEdges
      
      // Calculate node centers (top-left + half width)
      const nodeCenters = allNodes.map((n) => n.position.x + nodeWidth / 2);
      const minCenterX = Math.min(...nodeCenters);
      const maxCenterX = Math.max(...nodeCenters);
      const treeCenterX = (minCenterX + maxCenterX) / 2;
      
      const minY = Math.min(...allNodes.map((n) => n.position.y));
      const maxY = Math.max(...allNodes.map((n) => n.position.y));
      const treeCenterY = (minY + maxY) / 2;
      
      // Shift all nodes so the tree center moves to x=0
      // We want treeCenterX to become 0, so we shift all centers by -treeCenterX
      // Since center = top-left + nodeWidth/2, we shift top-left by -treeCenterX
      // This preserves all relative positions and parent-child alignments
      const offsetX = -treeCenterX;
      
      result.nodes = allNodes.map((n) => ({
        ...n,
        position: { 
          x: n.position.x + offsetX, 
          y: n.position.y - treeCenterY 
        },
      }));
    }

    return { nodes: result.nodes, edges: result.edges };
  }, [selectedPage]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when selectedPage changes
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setSelectedComponentId(""); // Reset selected component when page changes
    // Fit view after nodes are updated
    setTimeout(() => {
      reactFlowInstance.current?.fitView({ padding: 0.3, duration: 400 });
    }, 100);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  // Move camera/view to selected node - NO style changes, just view movement
  useEffect(() => {
    if (selectedComponentId && reactFlowInstance.current) {
      // Get current nodes from React Flow instance
      const currentNodes = reactFlowInstance.current.getNodes();
      // Find the exact node with matching ID
      const selectedNode = currentNodes.find((n) => n.id === selectedComponentId);
      
      if (selectedNode) {
        // Calculate center of the node
        const nodePosition = selectedNode.position;
        const nodeWidth = selectedNode.width || 200;
        const nodeHeight = selectedNode.height || 90;
        
        const centerX = nodePosition.x + nodeWidth / 2;
        const centerY = nodePosition.y + nodeHeight / 2;
        
        // Only move the camera/view - don't modify any node styles
        setTimeout(() => {
          if (reactFlowInstance.current) {
            reactFlowInstance.current.setCenter(centerX, centerY, {
              duration: 400,
              zoom: 1.0, // Keep current zoom level
            });
          }
        }, 100);
      }
    }
  }, [selectedComponentId]);

  const onConnect = useCallback(
    (params: Edge) => setEdges((eds) => [...eds, params]),
    [setEdges]
  );

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPage(e.target.value);
    setSelectedComponentId(""); // Reset component selection when page changes
    setExpandedNodes(new Set()); // Reset expanded nodes
  };

  const handleToggleExpand = (id: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectComponent = (id: string) => {
    setSelectedComponentId(id);
  };

  return (
    <div className="w-full h-screen bg-zinc-50 dark:bg-zinc-950">
      {availablePages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-600 text-lg">No pages available</p>
        </div>
      ) : !pageStructures[selectedPage] ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-600 text-lg">Page structure not found</p>
        </div>
      ) : (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={(connection) => onConnect(connection as Edge)}
          onInit={(instance) => {
            reactFlowInstance.current = instance;
          }}
          connectionMode={ConnectionMode.Loose}
          fitView
          fitViewOptions={{ padding: 0.3, includeHiddenNodes: false, minZoom: 0.1, maxZoom: 2 }}
          attributionPosition="bottom-left"
        >
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              const nodeType = node.data?.nodeType;
              switch (nodeType) {
                case "page":
                  return "#3b82f6";
                case "container":
                  return "#6b7280";
                case "component":
                  return "#10b981";
                case "section":
                  return "#8b5cf6";
                case "element":
                  return "#f97316";
                default:
                  return "#9ca3af";
              }
            }}
            maskColor="rgba(0, 0, 0, 0.1)"
            className="bg-white/90 border border-gray-300 rounded-lg"
          />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />

          <Panel position="top-left" className="bg-white/90 dark:bg-zinc-900 backdrop-blur-sm p-4 rounded-lg shadow-lg m-4 max-w-sm">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold mb-2 text-foreground">Page Analyzer</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Select a page and click components to highlight them
                </p>
              </div>
              <div className="w-full">
                <Select
                  label="Select Page"
                  value={selectedPage}
                  onChange={handlePageChange}
                  options={availablePages}
                />
              </div>
              {currentPageStructure && (
                <div className="w-full">
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Component Structure
                  </label>
                  <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950 max-h-[500px] overflow-y-auto">
                    <TreeNode
                      component={currentPageStructure}
                      level={0}
                      expandedNodes={expandedNodes}
                      onToggleExpand={handleToggleExpand}
                      onSelect={handleSelectComponent}
                      selectedId={selectedComponentId}
                    />
                  </div>
                  {selectedComponentId && (
                    <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-xs text-yellow-800 dark:text-yellow-200">
                      <p className="font-semibold">Component highlighted in diagram</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Panel>
        </ReactFlow>
      )}
    </div>
  );
};

export default DynamicPageAnalyzer;
