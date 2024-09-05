import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Product, About, Contact } from "./pages";
import { Navbar, Footer } from "./components/common";
import Products from "./components/category/CategoryProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          {/* <Route path="product" element={<Product />} /> */}
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/category/:category" element={<Products />} />
          <Route path="/category" element={<Products />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
